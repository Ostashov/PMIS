module.exports = {
  PORT: process.env.PORT || 3000,
  PG_URL:
    process.env.PG_URL || "postgres://olegostashov:@localhost:5432/medmanis",
  MONGO_URL: process.env.MONGO_URL,
  PG_user: process.env.PG_USER || "olegostashov",
  PG_host: process.env.PG_HOST || "localhost",
  PG_database: process.env.PG_DATABASE || "medmanis",
  PG_password: process.env.PG_password || "",
  PG_port: process.env.PG_PORT || 5432,
  SECRET: process.env.SECRET || "h3sqq%pb#dHh^XcU8&Uj8brVS_*$LGHW",
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || 86400
};
