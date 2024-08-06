import neo4j from "neo4j-driver";
import express, { NextFunction, Request, Response, Router } from "express";
import { getAllHexes } from "./hex/get";
import { createScoreComponentConfig } from "./component/create";
import { getModsChildren } from "./mod/get";
import { getInitialStateFromUserRoot } from "./clientInit/get";
import { UserProfile } from "../types/schema";
import { getEnvVar } from "../util/util";
import { getUserById } from "./user/get";

export const driver = neo4j.driver(
  getEnvVar("NEO4J_DRIVER_URL"),
  neo4j.auth.basic(getEnvVar("NEO4J_USERNAME"), getEnvVar("NEO4J_PASSWORD")),
  { disableLosslessIntegers: true },
);

const router: Router = express.Router();

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    const profile = req.user as UserProfile;
    console.log("User in session:", profile.id);
    return next();
  }
  res.status(401).send("Unauthorized");
};

// test current user profile
router.get("/profile", isAuthenticated, async (req: Request, res: Response) => {
  const session = driver.session();
  try {
    const profile = req.user as UserProfile;
    const user = await getUserById(session, profile.id);
    res.send(user); // Access the authenticated user
  } catch (error) {
    console.error("unable to get current profile", error);
  } finally {
    session.close();
  }
});

// Test route
router.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Any Tabletop!");
});

router.get("/init", async (req: Request, res: Response) => {
  const session = driver.session();
  try {
    const user = req.user as UserProfile;
    if (user) {
      const initialState = await getInitialStateFromUserRoot(session, user.id);
      res.send(initialState);
    } else {
      res.send({ message: "Dan, make sure to implement default state method" });
    }
  } catch (error) {
    console.error("Failed to fetch initial state", error);
    res.status(500).send("Unable to initialize application state");
  } finally {
    await session.close();
  }
});

router.get("/hex/all", async (req: Request, res: Response) => {
  const session = driver.session();
  try {
    const hexes = await getAllHexes(session);
    const response: Record<string, any> = {};
    hexes.records.forEach((r: any) => {
      r._fields.forEach((f: any) => {
        const properties = f.properties;
        response[properties.locId] = properties;
      });
    });
    res.send(response);
  } catch (error) {
    console.error("Error fetching hexes:", error);
    res.status(500).send("Error fetching hexes");
  } finally {
    await session.close();
  }
});

router.put("/component/new/:modId", async (req: Request, res: Response) => {
  const session = driver.session();
  const modId: string = req.params.modId;
  try {
    const { config } = req.body;
    const result = await createScoreComponentConfig(session, config, modId);
    res.status(201).send(result);
  } catch (error) {
    console.error("FAILED TO CREATE", error);
    res.status(500).send(`Error creating Config on Mod ${modId}`);
  } finally {
    await session.close();
  }
});

router.get("/mod/children", async (req: Request, res: Response) => {
  const session = driver.session();
  // TODO: replace modName with mod ID in query path
  const modName: string = "DnD 5e Game Setup";
  try {
    const modAndChildren = await getModsChildren(session, modName);
    res.send(modAndChildren);
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error fetching mod and children ${modName}`);
  } finally {
    await session.close();
  }
});

export default router;
