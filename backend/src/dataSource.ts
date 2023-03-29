import { DataSource } from "typeorm";
import path from "path";
import { __prod__ } from "./constants";

export const dataSource = new DataSource({
  url: process.env.DATABASE_URL,
  type: "postgres",
  host: "db",
  logging: false,
  synchronize: true,
  entities: [path.join(__dirname, "./entities/*")],
  migrations: [path.join(__dirname, "./migrations/*")],
  ssl: false,
});
