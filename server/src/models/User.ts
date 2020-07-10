import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import Account from "./Account";

@Entity()
export default class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ select: false, default: false })
    dev!: boolean;

    @Column({
        unique: true, transformer: {
            to: (v: string) => v.toLowerCase(),
            from: (v: string) => v.toLowerCase(),
        }
    })
    username!: string;

    @Column({ select: false })
    password_hash!: string;

    @Column({ nullable: true })
    email!: string;

    @OneToOne(() => Account, a => a.user, { eager: true })
    account!: Account

}