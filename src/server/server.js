const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const crypto = require("crypto");
const path = require("path");
//const packageJsonPath = path.resolve(__dirname, '../../package.json');
//const packageJson = require(packageJsonPath);
const config = require('./config'); // Adjust path if `config.js` is in a different directory
const packageJson = require(config.packageJsonPath);
const { createProxyMiddleware } = require('http-proxy-middleware');

// App constants
const port = process.env.PORT || 3000;

// Create the Express app & setup middlewares
const app = express();

// Proxy configuration
const API_URL = 'https://httpbin.org/'; // External API URL
 
// Proxy middleware
app.use(
  '/api',
  createProxyMiddleware({
    target: API_URL,
    changeOrigin: true,
    pathRewrite: {
      '^/api': '', // Remove /api prefix when forwarding to the target server
    },
    onProxyReq: (proxyReq, req, res) => {
         },
    onProxyRes: (proxyRes, req, res) => {
         },
    onError: (err, req, res) => {
      console.error(`Proxy error: ${err.message} for ${req.method} ${req.url}`);
      res.status(500).send('Proxy error');
    },
  })
);

// Serve static files from the "build" directory
app.use(express.static(path.join(__dirname, '..', 'build')));

// Handle local API requests (your backend logic)
app.get('/local-api/hello', (req, res) => {
  console.log('Received request on /local-api/hello');
  res.send({ message: 'Hello from the backend!' });
});

// Serve index.html for all other routes (so front-end routing works)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
