import { Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn, OneToMany, UpdateDateColumn  } from "typeorm";
import { Roles } from "./userRoles";
import { Genre } from "src/genre/entities/genre.entity";
import { Livre } from "src/livres/entities/livre.entity";
@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ nullable: false })
    nom: string;
    @Column({ nullable: false })
    prenom: string;
    @Column({ unique: true, nullable: false })
    email: string;
    @Column({ unique: true, nullable: false })
    username: string;
    @Column({select: false, nullable: false })
    password: string;
    @Column({ type: 'enum', enum: Roles, default: Roles.USER })
    roles: Roles[];  
    @Column({default: 1})
    isActive: boolean;
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
    @OneToMany(()=>Genre,(gen)=>gen.addBy)
    genre:Genre[];
    @OneToMany(() => Livre,(livre)=>livre.addBy)
    livre:Livre[];
}