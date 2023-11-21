/* eslint-disable no-console */

import { DataSource } from "typeorm";

function getSSLConfig(env: string | undefined) {
  const configs: { [key: string]: boolean | { [key: string]: boolean } } = {
    production: { rejectUnauthorized: true },
    local: false,
    deploy: { rejectUnauthorized: false },
  };
  return env === undefined ? configs.local : configs[env];
}
export const dataSource = new DataSource({
  url: "postgres://commentsdb_s6hg_user:q3lK3uiZs83Ff3qTIjp3LDN8MZd95udY@dpg-clea4i0lccns73e9h53g-a.frankfurt-postgres.render.com/commentsdb_s6hg",
  // host: process.env.POSTGRES_HOST,
  // port: Number(process.env.POSTGRES_PORT_DB),
  logging: ["query", "error"],
  type: "postgres",
  // entities: ["dist/**/*.entity.{ts,js}"],
  // migrations: ["dist/migrations/**/*.{ts,js}"],
  // subscribers: ["src/subscriber/**/*.ts"],
  // database: process.env.POSTGRES_DB,
  // username: process.env.POSTGRES_USER,
  // password: process.env.POSTGRES_PASSWORD,
  // ssl: getSSLConfig(process.env.SERVER_MODE),
  synchronize: true,
});

const connectDB = async () => {
  try {
    await dataSource.initialize();
    console.log("PostgresDB Connected...");
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log("error");
      console.error(err.message);
    } else {
      console.error("Unknown Error");
    }
    process.exit(1);
  }
};

export default connectDB;
