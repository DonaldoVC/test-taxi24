export default () => ({
  database: {
    host: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    cluster: process.env.DATABASE_CLUSTER,
  }
});