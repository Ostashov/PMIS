module.exports = {
  PORT: process.env.PORT || 3000,
  MONGO_URL: process.env.MONGO_URL,
  PG_URL: process.env.PG_URL || "postgresql://localhost",
  user: process.env.PG_USER || "olegostashov",
  host: process.env.PG_HOST || "localhost",
  database: process.env.PG_DATABASE || "medmanis",
  password: "",
  port_pg: process.env.PG_PORT || 5432
};
