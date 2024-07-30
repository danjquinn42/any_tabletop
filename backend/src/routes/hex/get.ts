async function getAllHexes(session: any) {
  // try {
  return await session.run("MATCH (n:HEX) RETURN n");
}

module.exports = getAllHexes;
