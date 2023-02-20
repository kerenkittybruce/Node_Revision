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
    con.query("SELECT * FROM products", (err, result) => {
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
  const { Product_Name } = req.body;
  const strQry = `
      SELECT Product_Name, Price
      FROM products
      WHERE Product_Name = '${Product_Name}';
      `;
  db.query(strQry, (err, data) => {
    if (err) throw err;
    if (!data.length || data == null) {
      res.status(401).json({
        err: "You selected an incorrect item . Please try again .",
      });
    } else {
      let { Product_Name } = data[0];
      if (Product_Name === data[0].Product_Name) {
        res
          .status(200)
          .json({ msg: `You have chosen this item : ${Product_Name}` });
      } else {
        res.status(200).json({ err: `You selected an illegitimate item .` });
      }
    }
  });
});

// GET --- RETRIEVE ALL USERS

route.get("/products", (req, res) => {
  const strQry = `
      SELECT Product_Name, Price
      FROM products;
      `;

  //  DB

  db.query(strQry, (err, data) => {
    if (err) throw err;
    res.status(200).json({ result: data });
  });
});

// PUT --- UPDATE USERS

route.put("./products/:ProdID", bodyParser.json(), (req, res) => {
  // :id --- the param sent to backend to be updated
  let data = req.body;
  const strQry = `
      UPDATE products
      SET ?
      WHERE ProdID = ?
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
      INSERT INTO products
      SET ?
      `;
  db.query(strQry, [details], (err) => {
    if (err) {
      res.status(400).json({ err });
    } else {
      res.status(200).json({ msg: "A product record was saved ." });
    }
  });
});

// DELETE A USER

route.delete("/user/:Prodid", (req, res) => {
  const strQry = `
      DELETE FROM products
      WHERE ProdID = ?;
      `;

  //  DB

  db.query(strQry, [req.params.id], (err) => {
    if (err) throw err;
    res
      .status(200)
      .json({ msg: "A record has been removed from a database ." });
  });
});
