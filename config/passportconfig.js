import passport from "passport";
import { Strategy as GitHubStrategy } from 'passport-github2';
import { Strategy as YoutubeV3Strategy } from 'passport-youtube-v3';
import dotenv from 'dotenv';

dotenv.config();

// Configure Passport with GitHub strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL || "http://localhost:3000/auth/github/callback",
  },
  (accessToken, refreshToken, profile, done) => {
    // Here, you would typically store the user info in a database
    // For this example, we will simply return the GitHub profile
    profile.accessToken = accessToken;
    return done(null, profile);
  }
));

// Configure Passport with Youtube strategy
passport.use(new YoutubeV3Strategy({
    clientID: process.env.GOOGLE_APP_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.YOUTUBE_CALLBACK_URL || "http://localhost:3000/auth/youtube/callback",
    scope: ['https://www.googleapis.com/auth/youtube.readonly']
  },
  (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  } 
));

// Serialize and deserialize user (necessary for session handling)
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});