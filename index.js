require('dotenv').config();
if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET) {
  console.log('Must set ENV variables CLIENT_ID and CLIENT_SECRET');
  process.exit();
}
const PORT = process.env.APP_PORT || 10420;
const HOSTNAME = `http://${process.env.APP_HOSTNAME}` || `http://localhost:${port}`

const cookieParser = require('cookie-parser');
const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(cookieParser());

app.use(express.static('public'));
app.get('/reddit-login', async (req, res) => {

  const headers = {
    'Authorization': `Basic ${btoa(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`)}`,
    'Accept': 'application/json',
  };
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code: req.query.code,
    redirect_uri: `${HOSTNAME}/reddit-login`
  });

  try {
    const tokenResponse = await fetch('https://www.reddit.com/api/v1/access_token', { method: 'POST', headers, body });
    const data = await tokenResponse.json();
    const expireDate = new Date();
    expireDate.setSeconds(expireDate.getSeconds() + data.expires_in);
    res.cookie('reddit_access_token', data.access_token);
    res.cookie('reddit_token_expires', expireDate.toISOString());
    res.cookie('reddit_refresh_token', data.refresh_token);
    res.cookie('reddit_scope', data.scope);
    res.redirect('/ready.html');
  } catch (error) {
    res.send('Error: ' + error);
  }

});

app.get('/reddit-api', async (req, res) => {
  const rToken = req.cookies['reddit_access_token'];
  const endpoint = req.query.endpoint;

  if (!rToken || !endpoint) {
    return res.end('Missing token or endpoint!');
  }

  try {
    const apiEndpoint = `https://oath.reddit.com/${endpoint}`;
    const apiHeaders = {
      'Authorization': `Bearer ${rToken}`,
      'Accept': 'application/json'
    };
    console.log(`Endpoint: ${apiEndpoint}`);
    const apiResponse = await fetch(apiEndpoint, { headers: apiHeaders });
    const apiData = await apiResponse.text();
    res.send(apiData);
  } catch (error) {
    res.send('Error: ' + error);
  }
});

const htmlIndex = `
Click here to log in: <a href="https://www.reddit.com/api/v1/authorize?client_id=xEg8JM9XwLp0NGlt471oBQ&response_type=code&
state=asdf&redirect_uri=${HOSTNAME}/reddit-login&duration=permanent&scope=*">Reddit Login</a>
`

app.get('/', async (req, res) => {
  res.send(htmlIndex);
});


app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
