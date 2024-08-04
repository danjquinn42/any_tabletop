import { Session } from "neo4j-driver";
import { isEmpty, isNil } from "lodash";
import { UnsecureInternalUserEntry, UserProfile } from "../../types/schema";
import { UNKNOWN_USER_ID } from "../../util/const";

export async function getUserByGoogleId(session: Session, googleId: string) {
  const query = `
        MATCH (user:User{ googleId: $googleId }) RETURN user
    `;

  try {
    const maybeUser = await session.run(query, { googleId });
    if (
      isNil(maybeUser) ||
      isEmpty(maybeUser.records) ||
      isEmpty(maybeUser.records[0].get("user"))
    ) {
      return Promise.resolve({ id: UNKNOWN_USER_ID });
    }
    if (maybeUser.records.length === 1) {
      const profile: UnsecureInternalUserEntry =
        maybeUser.records[0].get("user").properties;

      return Promise.resolve({
        displayName: profile.displayName,
        isProfileSetUp: profile.isProfileSetUp,
        id: profile.id,
      });
    }
    throw new Error(
      `INVALID GRAPH STATE: ${maybeUser.records.length} user nodes exist with the same googleId: ${googleId}`,
    );
  } catch (error) {
    console.error(`failed to check for user with googleId ${googleId}`, error);
  }
}

export async function getUserById(session: Session, id: string) {
  const query = `MATCH (user:User{ id: $id }) RETURN user`;
  const users = await session.run(query, { id });
  const userEntry = users.records[0].get("user").properties;
  return {
    displayName: userEntry.displayName,
    id: userEntry.id,
  } as UserProfile;
}
