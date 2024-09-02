require('dotenv').config();  // This line loads your .env file
const { google } = require('googleapis');
const scopes = ['https://www.googleapis.com/auth/cloud-platform'];

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,       // Client ID
  process.env.GEMINI_CLIENT_SECRET,   // Client Secret
  process.env.GEMINI_REDIRECT_URI     // Redirect URI
);

const code = '4/0AcvDMrBoe0D73gkoas2hbFZO3UcIVAm1VWCgNAg5W6a_Uq8li-kFlrB8Bj3kDKxWfGeY4g'; // Replace with your actual authorization code

oauth2Client.getToken(code, (err, tokens) => {
  if (err) {
    console.error('Error retrieving access token:', err);
    return;
  }
  console.log('Access Token:', tokens.access_token);
  console.log('Refresh Token:', tokens.refresh_token);

  // Store the refresh token in your .env file for future use
});
