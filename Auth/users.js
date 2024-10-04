const express = require("express");
const db_client = require("../db_client");
const jwt = require("jsonwebtoken");

let router = express.Router();

function generateWebToken(payload) {
  let token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });

  return token;
}

// for registering the user
router.post("/user/register", (req, res) => {
  let name = req.body.name;
  let mobile = req.body.mobile;
  let email = req.body.email;
  let password = req.body.password;
  let profile_pic = req.body.profile_pic;
  let country_code = req.body.country_code;

  console.log("Request body is : ", req.body);

  let query = `INSERT INTO users (name , mobile , email , password ,profile_pic,country_code) values('${name}','${mobile}','${email}','${password}', '${profile_pic}','${country_code}')`;
  console.log("Query is : ", query);

  db_client
    .query(query)
    .then((resp) => {
      let token = generateWebToken(req.body);
      let response_data = {
        name: name,
        mobile: mobile,
        email: email,
        profile_pic: profile_pic,
        country_code: country_code,
        token: token,
      };
      res.status(200).json(response_data);
    })
    .catch((err) => {
      console.log("Error came!!");
      res.status(500).json(err);
    });
});

// for loging in the user
router.get("/user", (req, res) => {
  let user_mobile = req.query.mobile;

  let query = `SELECT * FROM users where mobile = '${user_mobile}';`;

  console.log("running query : ", query);

  db_client
    .query(query)
    .then((result) => {
      res.status(200).json(result.rows[0]);
    })
    .catch((err) => res.status(500))
    .json(err);
});

// for getting all the contacts of the user
router.get("/user/contacts", (req, res) => {
  let user_mobile = req.query.mobile;

  let query = `SELECT contacts from users where mobile = '${user_mobile}' ORDER BY name asc;`;

  db_client
    .query(query)
    .then((result) => res.status(200).json(result.rows[0]))
    .catch((err) => res.status(500).json(err));
});

// for fetching a contact name, mobile and about and profile pic
router.get("/user/details", (req, res) => {
  let user_mobile = req.query.mobile;

  let query = `SELECT name , mobile , profile_pic, about from users where mobile = '${user_mobile}'`;
  console.log("running query is : ", query);

  db_client
    .query(query)
    .then((result) => res.status(200).json(result.rows[0]))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
