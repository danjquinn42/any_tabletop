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
const router = express.Router();

// test route
router.get("/", (req, res) => {
  res.send("Welcome to Ada!");
});

router.get("/hex/get", async (req, res) => {
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

router.put("/score-component-config", async (req, res) => {
  const gameId = "f441dc0a-3b4e-4cc1-b180-d6e8b48f9606";
  try {
    const { config } = req.body;
    // TODO: replace gameId with game in request body
    const response = await createScoreComponentConfig(
      session,
      config,
      gameId,
    ).then((result) => result);
    console.log(response);
    res.status(201).send(`Config created with relationships to Game ${gameId}`);
  } catch (error) {
    console.log("FAILED TO CREATE", error);
    res.status(500).send(`Error creating Config on Game ${gameId} ${error}`);
  }
});

module.exports = router;
