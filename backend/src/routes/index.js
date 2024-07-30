const neo4j = require("neo4j-driver");

const driver = neo4j.driver(
  "bolt://localhost:7687",
  neo4j.auth.basic("neo4j", "localDev"),
  { disableLosslessIntegers: true },
);
const session = driver.session();

const express = require("express");
const getAllHexes = require("./hex/get.ts");
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

module.exports = router;
