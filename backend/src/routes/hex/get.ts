import { Session } from "neo4j-driver";

async function getAllHexes(session: Session) {
  return await session.run("MATCH (n:HEX) RETURN n");
}

module.exports = getAllHexes;
