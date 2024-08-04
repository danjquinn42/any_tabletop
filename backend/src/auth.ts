import passport, { Profile } from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import express, { Request, Response, NextFunction } from "express";
import session from "express-session";
import dotenv from "dotenv";
import { getEnvVar } from "./util/util";
import { driver } from "./routes";
import { getUserByGoogleId } from "./routes/user/get";
import { UNKNOWN_USER_ID } from "./util/const";
import { createUser } from "./routes/user/create";
import { UnsecureInternalUserEntry, UserProfile } from "./types/schema";

dotenv.config();

const GOOGLE_CLIENT_ID = getEnvVar("GOOGLE_CLIENT_ID");
const GOOGLE_CLIENT_SECRET = getEnvVar("GOOGLE_CLIENT_SECRET");
const FRONTEND_URL = getEnvVar("FRONTEND_URL");
const GOOGLE_AUTH_CALLBACK_URL = getEnvVar("GOOGLE_AUTH_CALLBACK_URL");

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_AUTH_CALLBACK_URL,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: (
        err?: Error | unknown | null,
        user?: Express.User | false,
        info?: object,
      ) => void,
    ) => {
      const session = driver.session();
      try {
        let user = await getUserByGoogleId(session, profile.id);
        if (user?.id === UNKNOWN_USER_ID) {
          await createUser(session, profile);
          user = await getUserByGoogleId(session, profile.id);
        }
        return done(null, user);
      } catch (error) {
        console.error(error);
      } finally {
        session.close();
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  const profile = user as UserProfile;
  done(null, profile.id);
});

passport.deserializeUser(async (id: string, done) => {
  const session = driver.session();
  try {
    const result = await session.run(
      "MATCH (user:User {id: $id}) RETURN user",
      { id },
    );
    const profile: UnsecureInternalUserEntry =
      result.records[0]?.get("user").properties;
    const user: UserProfile = {
      id: profile.id,
      displayName: profile.displayName,
      isProfileSetUp: profile.isProfileSetUp,
    };
    done(null, user);
  } catch (error) {
    done(error, null);
  } finally {
    await session.close();
  }
});

const router = express.Router();

router.use(
  session({
    secret: getEnvVar("ANY_TABLE_SESSION_SECRET"),
    resave: true,
    saveUninitialized: true,
  }),
);
router.use(passport.initialize());
router.use(passport.session());

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login", "email"],
  }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req: Request, res: Response) => {
    const user = req.user as UserProfile;
    console.log("Authentication successful. User:", user.id);
    res.redirect(`${FRONTEND_URL}/`);
  },
);

router.get("/logout", (req: Request, res: Response, next: NextFunction) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

export default router;
