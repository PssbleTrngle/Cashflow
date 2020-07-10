import { Connection, DeepPartial } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import Category from "../models/Category";

export default class CategorySeeder implements Seeder {
    public async run(_: Factory, connection: Connection) {

        const categories: { [K in keyof Category]?: Category[K] }[] = []

        if (process.env.DEBUG === 'true') {
            await Category.delete({});
        }

        await connection
            .createQueryBuilder()
            .insert()
            .into(Category)
            .values(categories)
            .execute()

    }
}