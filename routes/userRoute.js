// EXPRESS ROUTER

const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");
const bodyParser = require("body-parser");
const route = express.Router();
app.use(route, express.json(), bodyParser.urlencoded({ extended: false }));

// HOME or "/"

router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM users", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

module.exports = router;

// LOGIN

route.patch("/login", bodyParser.json(), (req, res) => {
  const { User_Password } = req.body;
  const strQry = `
      SELECT User_Name, Country, User_Password
      FROM Users
      WHERE User_Password = '${User_Password}';
      `;
  db.query(strQry, (err, data) => {
    if (err) throw err;
    if (!data.length || data == null) {
      res.status(401).json({
        err: "You provided an incorrect user password . Please try again .",
      });
    } else {
      let { User_Password } = data[0];
      if (User_Password === data[0].User_Password) {
        res.status(200).json({ msg: `Welcome back, ${User_Password}` });
      } else {
        res.status(200).json({ err: `You provided an incorrect password` });
      }
    }
  });
});

// GET --- RETRIEVE ALL USERS

route.get("/users", (req, res) => {
  const strQry = `
      SELECT User_Name, Country, User_Password
      FROM Users;
      `;

  //  DB

  db.query(strQry, (err, data) => {
    if (err) throw err;
    res.status(200).json({ result: data });
  });
});

// PUT --- UPDATE USERS

route.put("./user/:userID", bodyParser.json(), (req, res) => {
  // :id --- the param sent to backend to be updated
  let data = req.body;
  const strQry = `
      UPDATE Users
      SET ?
      WHERE userID = ?
      `;

  // DB

  db.query(
    strQry,
    [data, req.params.userID], // parse query ; data = user info ; id === :id (id specified on Postman)
    (err) => {
      if (err) throw err;
      res.status(200).json({ msg: "A row was affected" });
    }
  );
});

// POST --- REGISTER

route.post("/register", bodyParser.json(), (req, res) => {
  let details = req.body;
  console.log(details);

  //  SQL QUERY

  const strQry = `
      INSERT INTO Users
      SET ?
      `;
  db.query(strQry, [details], (err) => {
    if (err) {
      res.status(400).json({ err });
    } else {
      res.status(200).json({ msg: "A user record was saved ." });
    }
  });
});

// DELETE A USER

route.delete("/user/:id", (req, res) => {
  const strQry = `
      DELETE FROM Users
      WHERE userID = ?;
      `;

  //  DB

  db.query(strQry, [req.params.id], (err) => {
    if (err) throw err;
    res
      .status(200)
      .json({ msg: "A record has beenn removed from a database ." });
  });
});
