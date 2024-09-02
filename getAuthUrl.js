const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID, // Your Client ID
  process.env.GEMINI_CLIENT_SECRET, // Your Client Secret
  process.env.GEMINI_REDIRECT_URI // Your Redirect URI
);

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: ['https://www.googleapis.com/auth/cloud-platform'],
});

console.log('Authorize this app by visiting this url:', authUrl);
