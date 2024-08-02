import neo4j from "neo4j-driver";
import express, { NextFunction, Request, Response, Router } from "express";
import { getAllHexes } from "./hex/get";
import { createScoreComponentConfig } from "./component/create";
import { getModsChildren } from "./mod/get";

export const driver = neo4j.driver(
  "bolt://localhost:7687",
  neo4j.auth.basic("neo4j", "localDev"),
  { disableLosslessIntegers: true },
);

const router: Router = express.Router();

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send("Unauthorized");
};

// get current user profile
router.get("/profile", isAuthenticated, (req: Request, res: Response) => {
  res.send(req.user); // Access the authenticated user
});

// Test route
router.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Any Tabletop!");
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

router.put(
  "/game/:gameId/score-component",
  async (req: Request, res: Response) => {
    const session = driver.session();
    const gameId: string = req.params.gameId;
    try {
      const { config } = req.body;
      await createScoreComponentConfig(session, config, gameId);
      res
        .status(201)
        .send(`Config created with relationships to Game ${gameId}`);
    } catch (error) {
      console.log("FAILED TO CREATE", error);
      res.status(500).send(`Error creating Config on Game ${gameId} ${error}`);
    } finally {
      await session.close();
    }
  },
);

router.get("/mod/children", async (req: Request, res: Response) => {
  const session = driver.session();
  console.log("GETTING MOD");
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
