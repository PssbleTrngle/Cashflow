import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn, Column } from "typeorm";
import Account from "./Account";
import Timestamps from "./Timestamps";

export enum Type { INCOME, EXPENSE }

@Entity()
export default class Category extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'text' })
    name!: string;

    @Column({ type: 'integer', enum: Type })
    type!: Type;

    @ManyToOne(() => Account, a => a.categories)
    account!: Promise<Account> | Account

}