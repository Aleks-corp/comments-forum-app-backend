import "dotenv/config";
import { DataSource } from "typeorm";

function getSSLConfig(env: string | undefined) {
  const configs: { [key: string]: boolean | { [key: string]: boolean } } = {
    production: { rejectUnauthorized: true },
    local: false,
    deploy: { rejectUnauthorized: false },
  };
  return env === undefined ? configs.local : configs[env];
}
const {
  POSTGRES_HOST,
  POSTGRES_PORT_DB,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
} = process.env;

const dataSource = new DataSource({
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT_DB),
  logging: ["query", "error"],
  type: "postgres",
  entities: ["dist/**/*.entity.{ts,js}"],
  // migrations: ["dist/migrations/**/*.{ts,js}"],
  // subscribers: ["src/subscriber/**/*.ts"],
  database: POSTGRES_DB,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  ssl: getSSLConfig(process.env.SERVER_MODE),
  synchronize: true,
});

export default dataSource;
