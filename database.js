const mysql = require("mysql");

//Create a connection
const connection = mysql.createConnection({
    host:'localhost',
    user: 'imasha',
    password: 'iHJ78IMurlaxYBde',
    database: 'ipt_database'
});

//open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Connected to the database.");
});


module.exports = connection;