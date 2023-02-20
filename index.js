// IMPORTING EXPRESS & CORS

const express = require("express");
const cors = require("cors");

// EXPRESS SERVER

const app = express();
app.set("port", process.env.PORT || 3306);
app.use(express.json());
app.use(cors());

// HOME ROUTE -- "/"

app.get("/", (req, res) => {
  res.json({ msg: "Welcome To My Revision Exercise!" });
});

// LISTEN FOR API CALLS

app.listen(app.get("port"), () => {
  console.log(`Listening for calls on port ${app.get("port")}`);
  console.log("Press CTRL + C to exit server");
});
