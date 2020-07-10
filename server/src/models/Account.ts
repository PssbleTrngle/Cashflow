import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import Apikey from "./Apikey";
import Flow from "./Flow";
import User from "./User";
import Category, { Type } from "./Category";
import Cron from "./Cron";

@Entity()
export default class Account {

    @PrimaryGeneratedColumn()
    id!: number;

    @OneToOne(() => User, u => u.account)
    @JoinColumn()
    user!: Promise<User>

    @OneToMany(() => Flow, f => f.account)
    flows!: Promise<Flow[]> | Flow[]

    @OneToMany(() => Category, c => c.account)
    categories!: Promise<Category[]> | Category[]

    @OneToMany(() => Cron, c => c.account)
    crons!: Promise<Cron[]> | Cron[]

    async fixedIncome() {
        const crons = await this.crons;
        return crons.filter(c => c.category.type === Type.INCOME)
            .map(c => c.amount)
            .reduce((a, b) => a + b, 0)
    }

}