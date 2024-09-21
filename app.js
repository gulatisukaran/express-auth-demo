import express from 'express';
import passport from 'passport';
import session from 'express-session';
import dotenv from 'dotenv';
import githubAuthRoutes from './routes/githubAuth.js';
import youtubeAuthRoutes from './routes/youtubeAuth.js';
import './config/passportconfig.js' // Ensure passport strategies are loaded

dotenv.config();

const app = express();

// Middleware to initialize Passport, session
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// ----Routes----

// Auth Routes
app.use('/', githubAuthRoutes);
app.use('/', youtubeAuthRoutes);

// Home route
app.get('/', (req, res) => {
  res.send('<h1>Home Page</h1><a href="/auth/github">Login with GitHub</a><br><a href="/auth/youtube">Login with Youtube</a>');
});

// Failed auth route
app.get('/failed', (req, res) => {
  res.send(`<p>Failed to authticate you, please return.</p>
      <a href="/">Home Page</a>`);
});

// Error handling route for an unxexpected error
app.use((err, req, res, next) => {
  console.error(err.stack);
  console.log(req);
  res.status(500).send('Something broke!');
});

// Logout route
app.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/');
    });
  });

// Start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT${PORT}`);
});
