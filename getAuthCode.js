const { google } = require('googleapis');

const geminiApiKey = process.env.GEMINI_API_KEY; // Your OAuth2 Client ID
const clientSecret = process.env.GEMINI_CLIENT_SECRET; // Your OAuth2 Client Secret
const redirectUri = 'http://localhost:3000/present'; // Your Redirect URI

const oauth2Client = new google.auth.OAuth2(
  geminiApiKey,
  clientSecret,
  redirectUri
);

const scopes = ['https://www.googleapis.com/auth/cloud-platform'];

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
});

console.log('Authorize this app by visiting this URL:', authUrl);
