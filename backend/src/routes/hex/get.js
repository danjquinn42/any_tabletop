async function getAllHexes(session) {
  // try {
  return await session.run("MATCH (n:HEX) RETURN n");
}

module.exports = getAllHexes;
