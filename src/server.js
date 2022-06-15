const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
// const db = require("./models");
// const Role = db.role;

// db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
  // initial();
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Sistem Informasi RS application." });
});

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/masterdata.routes')(app);
require('./routes/transaction.router')(app);

// set port, listen for requests
const port = Number(process.env.PORT || 3331);
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

