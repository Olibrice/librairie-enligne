import { Genre } from "src/genre/entities/genre.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity('livres')
export class Livre {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    book_title:string;

    @Column()
    book_description:string;

    @Column({type:'decimal',precision:10,scale:2,default:0})
    book_price:number;

    @Column()
    book_author:string;

    @Column()
    book_stock:number;

    @Column('simple-array')
    book_images:string[];

    @CreateDateColumn()
    createAt: Timestamp;
    @UpdateDateColumn()
    updateAt: Timestamp;
    @ManyToOne(()=> UserEntity,(user)=>user.livre)
    addBy: UserEntity;

    @ManyToOne(()=>Genre,(genre)=>genre.books)
    genre:Genre;

    






}
