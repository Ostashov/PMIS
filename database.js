const config = require("./config");
// const pg = require("pg");
const { Pool, Client } = require("pg");
const connectionString = process.env.DATABASE_URL || config.PG_URL;

const pool = new Pool({
  connectionString: connectionString
});

// const client = new pg.Client(connectionString);
const client = new Client({
  connectionString: connectionString
});

client.connect();

// client.query("select * from users;", (err, res) => {
//   if (err) {
//     console.log(err.stack);
//   } else {
//     console.log(res.rows);
//   }
//   client.end();
// });

////////////////////

// (async () => {
//   await client.connect();

//   var query = await client.query(
//     "CREATE TABLE IF NOT EXISTS users ( \
// 	id serial, \
// 	login text, \
// 	email text, \
// 	register_dttm timestamp, \
// 	usertype_id numeric(9,2), \
// 	deleted_flag numeric(9,2), \
// 	PRIMARY KEY( id ) \
//   ); \
//   \
//   CREATE TABLE IF NOT EXISTS specialists ( \
// 	id serial, \
// 	user_id numeric(9,2), \
// 	organisation_id numeric(9,2), \
// 	specialisation_id numeric(9,2), \
// 	firstname text, \
// 	lastname text, \
// 	middlename text, \
// 	birthdate date, \
// 	deleted_flag numeric(9,2), \
// 	PRIMARY KEY( id ) \
//   );",
//     (res, err) => {
//       console.log(res);
//     }
//   );

//   query = await client.query(
//     "select * from users",
//     // "insert into users(login, email) VALUES('qwe','rty');",
//     (res, err) => {
//       console.log(res);
//     }
//   );

//   query = await client.query("select * from users;", (res, err) => {
//     console.log(res);
//     client.end();
//   });
// })();

// const mongoose = require("mongoose");

// module.exports = () => {
//   return new Promise((resolve, reject) => {
//     mongoose.Promise = global.Promise;
//     mongoose.set("debug", true);

//     mongoose.connection
//       .on("error", error => reject(error))
//       .on("close", () => console.log("Database connection closed."))
//       .once("open", () => resolve(mongoose.connections[0]));

//     mongoose.connect(config.MONGO_URL);
//   });
// };
