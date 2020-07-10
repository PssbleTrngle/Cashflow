import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn, Column, BeforeInsert, AfterInsert } from "typeorm";
import Account from "./Account";
import Timestamps from "./Timestamps";
import Category from "./Category";
import Cron from "./Cron";
import { debug } from "../logging";

@Entity()
export default class Flow extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'integer', unsigned: true })
    amount!: number;

    @ManyToOne(() => Category, { eager: true })
    category!: Category

    @Column(() => Timestamps)
    timestamps!: Timestamps;

    @ManyToOne(() => Account, a => a.flows)
    account!: Promise<Account> | Account

    @ManyToOne(() => Cron, c => c.flows, { eager: true, nullable: true })
    cron?: Cron

    @AfterInsert()
    createCron() {
        if(this.cron) {
            debug('Flow with cron created')
        }
    }

}