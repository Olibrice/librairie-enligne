import { Genre } from "src/genre/entities/genre.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity('livres')
export class Livre {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string;

    @Column()
    description:string;

    @Column({type:'decimal',precision:10,scale:2,default:0})
    price:number;

    @Column()
    author:string;

    @Column()
    stock:number;

    @Column('simple-array')
    images:string[];

    @CreateDateColumn()
    createAt: Timestamp;
    @UpdateDateColumn()
    updateAt: Timestamp;
    @ManyToOne(()=> UserEntity,(user)=>user.livre)
    addBy: UserEntity;

    @ManyToOne(()=>Genre,(genre)=>genre.books)
    genre:Genre;

    






}
