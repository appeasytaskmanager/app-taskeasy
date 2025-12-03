import {
    pgTable,
    uuid,
    varchar,
    timestamp,
    unique,
} from "drizzle-orm/pg-core"
import { updateTag } from "next/cache"
import { users } from "./users"; 

//exportando a tabela
export const categories = pgTable("categories", {
    id: uuid("id").defaultRandom().primaryKey(),

    // nome da categoria
    name: varchar("name", {length: 255}).notNull(), //nome obrigatório

    userId: uuid("user_id")
    .notNull()
    .references(() => users.id, {onDelete: "cascade"}),

    //campos de controle criação e atualização:
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => ({
    // Cada usuário pode ter apenas uma categoria com o mesmo nome
    uniqueUserCategory: unique().on(table.name, table.userId),
}));

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;