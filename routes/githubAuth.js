import { Router } from "express";
import passport from 'passport';
import { userAuthenticated, userFollowsGithub } from "../middlewares/middlewares.js";

const router = Router();

// Route to authenticate with GitHub
router.get('/auth/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

// GitHub callback route
router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/failed' }),
  (req, res) => {
    // Successful authentication, redirect to profile.
    res.redirect('/profile');
  }
);

router.get('/not-authorised', (req, res) => {
    res.send(`<p>You do not follow byte github account</p>
        <a href="/">Home Page</a>`);
});

// Profile route (protected)
router.get('/profile', userAuthenticated, userFollowsGithub, (req, res) => {
  res.send(`<h1>Profile</h1><p>Welcome ${req.user.displayName}</p><a href="/logout">Logout</a>`);
});

export default router;