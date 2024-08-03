import { Session } from "neo4j-driver";
import { UnsecureInternalUserEntry } from "../../types/schema";
import { Profile } from "passport";
import crypto from "crypto";
import { DEFAULT_MOD_ID } from "../../util/const";

export async function createUser(session: Session, googleProfile: Profile) {
  const id = crypto.randomUUID();
  const rootId = crypto.randomUUID();
  const googleId = googleProfile.id;
  const modId = DEFAULT_MOD_ID;
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

  const createUser = `
        CREATE (user:User {
            id: $id,
            googleId: $googleId,
            isProfileSetUp: $isProfileSetUp,
            name: $name,
            givenName: $givenName,
            familyName: $familyName,
            email: $email
        }) 
        RETURN user
        `;

  const createRoot = `
        CREATE (root:Root{ id: $rootId })
        RETURN root
     `;

  const attachUserToRoot = `
        MATCH (user:User { id: $id })
        MATCH (root:Root { id: $rootId })
        CREATE (user)-[:ENTRY]->(root)
        `;

  const attachRootToMod = `
        MATCH (root:Root { id: $rootId })
        MATCH (mod:Mod { id: $modId })
        CREATE (root)-[:HAS]->(mod)
    `;

  try {
    await session.executeWrite(async (transaction) => {
      const userResult = await transaction.run(createUser, userEntry);
      console.log("User created:", userResult);

      const rootResult = await transaction.run(createRoot, { rootId });
      console.log("Root node created:", rootResult);

      const attachRootResult = await transaction.run(attachUserToRoot, {
        id: userEntry.id,
        rootId,
      });
      console.log("Attached user to root:", attachRootResult);

      const attachGameResult = await transaction.run(attachRootToMod, {
        rootId,
        modId,
      });
      console.log("Attached root to game:", attachGameResult);
    });
  } catch (error) {
    console.error(`Failed to create user from profile ${googleProfile}`, error);
  }
}
