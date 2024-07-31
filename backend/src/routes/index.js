const neo4j = require("neo4j-driver");

const driver = neo4j.driver(
  "bolt://localhost:7687",
  neo4j.auth.basic("neo4j", "localDev"),
  { disableLosslessIntegers: true },
);
const session = driver.session();

const express = require("express");
const getAllHexes = require("./hex/get.ts");
const createScoreComponentConfig = require("./component/create.ts");
const { getModsChildren } = require("./mod/get");
const router = express.Router();

// test route
router.get("/", (req, res) => {
  res.send("Welcome to Ada!");
});

router.get("/hex/all", async (req, res) => {
  const hexes = await getAllHexes(session).then((result) => result);
  const response = {};
  hexes.records.forEach((r) => {
    r._fields.forEach((f) => {
      let properties = f.properties;
      response[properties.locId] = properties;
    });
  });
  res.send(response);
});

router.put("/game/:gameId/score-component", async (req, res) => {
  const gameId = req.params.gameId;
  try {
    const { config } = req.body;
    await createScoreComponentConfig(
      session,
      config,
      gameId,
    ).then((result) => result);
    res.status(201).send(`Config created with relationships to Game ${gameId}`);
  } catch (error) {
    console.log("FAILED TO CREATE", error);
    res.status(500).send(`Error creating Config on Game ${gameId} ${error}`);
  }
});

router.get("/mod/children", async (req, res) => {
  console.log("GETTING MOD");
  // TODO: replace modName with mod ID in query path
  const modName = "DnD 5e Game Setup";
  try {
    const modAndChildren = await getModsChildren(session, modName).then(
      (result) => result,
    );
    res.send(modAndChildren);
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error fetching mod and children ${modName}`);
  }
});

module.exports = router;
