import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const bucketTable = pgTable("bucket", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    length: integer().default(12)
});
