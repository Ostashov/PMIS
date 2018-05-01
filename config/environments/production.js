module.exports = {
  PORT: process.env.PORT || 3000,
  PG_URL: process.env.PG_URL,
  MONGO_URL: process.env.MONGO_URL,
  PG_user: process.env.PG_USER,
  PG_host: process.env.PG_HOST,
  PG_database: process.env.PG_DATABASE,
  PG_password: process.env.PG_password,
  PG_port: process.env.PG_PORT || 5432,
  SESSION_SECRET: process.env.SESSION_SECRET || "musecretstring"
};
