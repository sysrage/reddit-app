# reddit-app
This is a very basic express app for testing the Reddit API. It requires that you've registered a "web application" with Reddit for API usage.

## Configuration

Installation Steps:
1. Clone this repository.
2. Change to the directory where the repository was cloned.
3. Run: `npm install`
4. Register application with Reddit (see below).
5. Create `.env` file with the necessary properties (see below).

You must create a `.env` file in the base application directory. This file should contain the following properties:
- `CLIENT_ID` - This is the client ID as shown in Reddit settings (see below).
- `CLIENT_SECRET` - This is the client secret as shown in Reddit settings (see below).
- `PORT` (Optional) - If provided, this will be the port the express server listens on. Port will be `10420` if not specified.
- `APP_HOSTNAME` (Optional) - If provided, this will be used for the redirect URIs. Otherwise, `http://localhost:PORT` will be used.

The following link explains how to register a "web application" with Reddit. This process provides the `CLIENT_ID` and `CLIENT_SECRET` values listed above:
- https://github.com/reddit-archive/reddit/wiki/OAuth2

The following link contains general rules for using the Reddit API:
- https://github.com/reddit-archive/reddit/wiki/API

The following link contains the current Reddit API documentation:
- https://www.reddit.com/dev/api

## Usage

Once the above configuration steps are complete, the server can be started by typing `npm start` or `node index.js`. You can then connect with any browser.
