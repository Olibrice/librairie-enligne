import { Livre } from "src/livres/entities/livre.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn} from "typeorm";

@Entity('genres')
export class Genre {
  @PrimaryGeneratedColumn()
  id:number;
  @Column({ unique: true, nullable: false })
  genres:string;
  
   @CreateDateColumn()
   createAt: Timestamp;
   @UpdateDateColumn()
   updateAt: Timestamp;

   @ManyToOne(()=>UserEntity,(user)=>user.genre)
   addBy:UserEntity;

   @OneToMany(() => Livre,(livre)=>livre.genre)
   books:Livre[];
}


