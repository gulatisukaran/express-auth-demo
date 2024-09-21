import { Octokit } from "@octokit/core";
import fetch from "node-fetch";
import { google } from "googleapis";



// ----Middlewares----
export function userAuthenticated(req, res, next) {
    if(req.isAuthenticated) {
        return next();
    }
    res.redirect('/failed');
}

export async function userFollowsGithub(req, res, next) {

    const octokit = new Octokit({
      auth: req.user.accessToken, // Or however you're handling auth
      request: {
        fetch: fetch,
      },
    });

    const targetAccount = 'bytemait';  // Account to check if the user is following

    try {
      // Use Octokit to check if the authenticated user is following the target account
      const response = await octokit.request('GET /user/following/{username}', {
        username: targetAccount
      });
  
      if (response.status === 204) {
        // User is following the account, proceed to the next middleware or route
        return next();
      } else {
        res.redirect('/not-authorized');
      }
    } catch (err) {
      // Handle the case where the user is not following
      console.log(err);
      res.redirect('/not-authorized');
    }
}

export async function userFollowsYoutube(req, res, next) {

  const youtube = google.youtube({
    version: 'v3',
    auth: req.user.accessToken // Use the access token received during authentication
  });

  const targetChannelId = 'UCsilEv_20FmmBr5CDzmTMgg'; // Channel you want to check

  try {
    // Make an API request to get the user's subscriptions
    const response = youtube.subscriptions.list({
      part: 'snippet',
      mine: true, // Get the authenticated user's subscriptions
      maxResults: 50
    });

    const subscriptions = response.data.items;

    // Check if the user follows the target channel
    const isSubscribed = subscriptions.some(sub => sub.snippet.resourceId.channelId === targetChannelId);

    if (isSubscribed) {
      console.log('User is subscribed to the channel');
      return next(); // Proceed to the next middleware/route handler
    } else {
      console.log('User is not subscribed to the channel');
      return res.status(403).send('You must be subscribed to the channel to access this resource');
    }
  } catch (err) {
    console.error('Error checking subscriptions:', err);
    return res.status(500).send('Failed to check subscriptions');
  }
}
