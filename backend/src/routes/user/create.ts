import { Session } from "neo4j-driver";
import { UnsecureInternalUserEntry } from "../../types/schema";
import { Profile } from "passport";
import crypto from "crypto";

export async function createUser(session: Session, googleProfile: Profile) {
  const id = crypto.randomUUID();
  const googleId = googleProfile.id;

  try {
    const query = `
        CREATE (user:User{
            id: $id,
            googleId: $googleId,
            isProfileSetUp: $isProfileSetUp,
            name: $name,
            givenName: $givenName,
            familyName: $familyName,
            email: $email
        })
    `;

    const email: undefined | string =
      googleProfile.emails &&
      googleProfile.emails[0] &&
      googleProfile.emails[0].value;

    const userEntry: UnsecureInternalUserEntry = {
      id,
      googleId,
      isProfileSetUp: false,
      name: googleProfile.displayName,
      givenName: googleProfile.name?.givenName,
      familyName: googleProfile.name?.familyName,
      email,
    };

    return session.run(query, userEntry);
  } catch (error) {
    console.error(`Failed to create user from profile ${googleProfile}`, error);
  }
}
