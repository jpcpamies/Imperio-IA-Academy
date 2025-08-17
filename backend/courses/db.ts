import { SQLDatabase } from "encore.dev/storage/sqldb";

export const coursesDB = new SQLDatabase("courses", {
  migrations: "./migrations",
});
