import {
    pgTable,
    uuid,
    varchar,
    timestamp,
} from "drizzle-orm/pg-core"
import { updateTag } from "next/cache"

//exportando a tabela
export const categories = pgTable("categories", {
    id: uuid("id").defaultRandom().primaryKey(),

    // nome da categoria
    name: varchar("name", {length: 255}).notNull().unique(), //nome obrigatório

    //campos de controle criação e atualização:
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updateAt: timestamp("update_at").defaultNow().notNull(),
});

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;