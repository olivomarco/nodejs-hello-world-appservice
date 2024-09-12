const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const crypto = require("crypto");
const path = require("path");
//const packageJsonPath = path.resolve(__dirname, '../../package.json');
//const packageJson = require(packageJsonPath);
const config = require('./config'); // Adjust path if `config.js` is in a different directory
const packageJson = require(config.packageJsonPath);

// App constants
const port = process.env.PORT || 3000;
const apiPrefix = "/api";

// Store data in-memory, not suited for production use!
const db = {
  test: {
    user: "test",
    currency: "$",
    description: `Test account`,
    balance: 75,
    transactions: [
      { id: "1", date: "2020-10-01", object: "Pocket money", amount: 50 },
      { id: "2", date: "2020-10-03", object: "Book", amount: -10 },
      { id: "3", date: "2020-10-04", object: "Sandwich", amount: -5 },
    ],
  },
  jondoe: {
    user: "jondoe",
    currency: "$",
    description: `Second test account`,
    balance: 150,
    transactions: [
      { id: "1", date: "2022-10-01", object: "Gum", amount: -2 },
      { id: "2", date: "2022-10-03", object: "Book", amount: -10 },
      { id: "3", date: "2022-10-04", object: "Restaurant", amount: -45 },
    ],
  },
};

// Create the Express app & setup middlewares
const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(cors({ origin: /http:\/\/(127(\.\d){3}|localhost)/ }));
// app.options("*", cors());

// // ***************************************************************************

// // Configure routes
// const router = express.Router();

// // Hello World for index page
// app.get("/", function (req, res) {
//   return res.send("Hello World!");
// });

// app.get("/api", function (req, res) {
//   return res.send("Fabrikam Bank API");
// });

// //app.use("/public", express.static(path.join(__dirname, ".")));

// // Serve index.html for all other routes (so front-end routing works)
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

// // ----------------------------------------------

// // Get all data for the specified account
// router.get("/accounts/:user", (req, res) => {
//   const account = db[req.params.user];

//   // Check if account exists
//   if (!account) {
//     return res.status(404).json({ error: "User does not exist" });
//   }

//   return res.json(account);
// });

// // ***************************************************************************

// // Add 'api` prefix to all routes
// app.use(apiPrefix, router);

// // Start the server
// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });



// Serve static files from the "build" directory
app.use(express.static(path.join(__dirname, '..', 'build')));

// Handle API requests (your backend logic)
app.get('/api/hello', (req, res) => {
  console.log('Received request on /api/hello');
  res.send({ message: 'Hello from the backend!' });
});

// Serve index.html for all other routes (so front-end routing works)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
