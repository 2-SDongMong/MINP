import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from "typeorm";
  
  @Entity({ schema: "mooin_cat", name: "users" })
  export class User {
    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    id: number;
   
    @Column("varchar", { length: 10 })
    nickname: string;

    @Column("varchar", { select: false })
    password: string;
    
    @Column("varchar", { length: 10 })
    name: string;

    @Index({ unique: true })
    @Column("varchar", { length: 20 })
    email: string;

    @Column("varchar", { length: 50 })
    address: string;
  
    @Column("varchar", { length: 20 })
    phone_number: string;

    @Column("varchar", { length: 20 })
    status: string;

    @Column("varchar", { length: 20 })
    referral_code: string;

    @Column()
    admin: number;
  
    
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date | null;
  
    @DeleteDateColumn()
    deletedAt: Date | null;
  }