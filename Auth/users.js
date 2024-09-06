const express = require("express");
const db_client = require("../db_client");

let router = express.Router();

// for registering the user
router.post("/user/register", (req, res) => {
  let name = req.body.name;
  let mobile = req.body.mobile;
  let email = req.body.email;
  let password = req.body.password;
  let about = req.body.about;

  console.log("Request body is : ", req.body);

  let query = `INSERT INTO users (name , mobile , email , password , about) values('${name}','${mobile}','${email}','${password}', '${about}')`;
  console.log("Query is : ", query);

  db_client
    .query(query)
    .then((resp) => res.json("Success").status(200))
    .catch((err) => res.json(err).status(500));
});

// for loging in the user
router.get("/user", (req, res) => {
  let user_mobile = req.query.mobile;

  let query = `SELECT * FROM users where mobile = '${user_mobile}';`;

  console.log("running query : ", query);

  db_client
    .query(query)
    .then((result) => {
      res.json(result.rows[0]).status(200);
    })
    .catch((err) => res.json(err).status(500));
});

// for getting all the contacts of the user
router.get("/user/contacts", (req, res) => {
  let user_mobile = req.query.mobile;

  let query = `SELECT contacts from users where mobile = '${user_mobile}';`;

  db_client
    .query(query)
    .then((result) => res.json(result.rows[0]).status(200))
    .catch((err) => res.json(err).status(500));
});

// for fetching a contact name, mobile and about and profile pic
router.get("/user/details", (req, res) => {
  let user_mobile = req.query.mobile;

  let query = `SELECT name , mobile , profile_pic, about from users where mobile = '${user_mobile}'`;
  console.log("running query is : ", query);

  db_client
    .query(query)
    .then((result) => res.json(result.rows[0]).status(200))
    .catch((err) => res.json(err).status(500));
});

module.exports = router;
