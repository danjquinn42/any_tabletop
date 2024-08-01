import { Session } from "neo4j-driver";

export async function getAllHexes(session: Session) {
  return session.run("MATCH (n:HEX) RETURN n");
}
