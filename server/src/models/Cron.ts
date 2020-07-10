import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Account from "./Account";
import Timestamps from "./Timestamps";
import Category from "./Category";
import Flow from "./Flow";
import cron from 'cron-converter'

@Entity()
export default class Cron extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Account, a => a.crons)
    account!: Promise<Account> | Account

    @OneToMany(() => Flow, f => f.cron)
    flows!: Promise<Flow[]> | Flow[]

    @Column({ type: 'integer', unsigned: true })
    amount!: number;

    @ManyToOne(() => Category, { eager: true })
    category!: Category

    @Column()
    next!: Date

    @Column({ type: 'text', transformer: {
        from: s => new cron().fromString(s),
        to: (c: cron) => c.toString(),
    } })
    pattern!: cron

    async nextDate() {
        this.next = this.pattern.schedule(this.next).next().toDate();
        await this.save(); 
    }

    static async createFor(flow: Flow, pattern: cron | string) {
        const p = typeof pattern === 'string' ? new cron().fromString(pattern) : pattern
        const next = flow.timestamps.created
        const { amount, category, account } = flow;
        const c = Cron.create({ flows: [flow], amount, category, account, pattern: p, next })
        
        await c.nextDate();
        return c;
    }

}