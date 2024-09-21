import { Router } from "express";
import passport from "passport";
import { userFollowsYoutube, userAuthenticated } from "../middlewares/middlewares.js";

const router = Router();


// pahle to smajha user kaha hai code me 
// use kaise access kar sakta hu
// fir dekha user aa bhi rha h ya nhi yt auth se
// fir error aya console me
// fir pata chala google ki jaga yutube use karna tha eg jaga

// YouTube Authentication Route (Google OAuth)
router.get('/auth/youtube', passport.authenticate('youtube'));

// YouTube Authentication Callback Route
router.get('/auth/youtube/callback', 
  passport.authenticate('youtube', { failureRedirect: '/failed' }),
  (req, res) => {
    res.redirect('/yt-profile');
  }
);

router.get('/not-authorized', (req, res) => {
  res.send(`<p>You are not allowed the auth</p>
      <a href="/">Home Page</a>`);
});

// Profile route (protected)
router.get('/yt-profile', userAuthenticated, userFollowsYoutube, (req, res) => {
res.send(`<h1>Profile</h1><p>Welcome ${req.user.displayName}</p><a href="/logout">Logout</a>`);
});

export default router;