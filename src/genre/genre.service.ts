import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from './entities/genre.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class GenreService {
  constructor(@InjectRepository(Genre)
   private readonly genreRepository:Repository<Genre>){}

   async create(createGenreDto: CreateGenreDto,User:UserEntity) {
    const genre= this.genreRepository.create(createGenreDto);
    const genreExist = await this.genreRepository.findOne({where : {genres: genre.genres}})
    if(genreExist) {
      throw new BadRequestException("Genre already exists");
    }
    genre.addBy=User;
    return await this.genreRepository.save(genre);
  }
  async findAll():Promise<Genre[]> {
    return await this.genreRepository.find();
  }

  async findOne(id: number):Promise<Genre> {

    
    const genre= await this.genreRepository.findOne(
       {
         where:{id:id},
         relations:{addBy:true},
         select:{
           addBy:{
          id:true,
          nom:true,
          prenom:true,
          email:true,
               }
         }
       }
      
     );
     if(!genre) throw new NotFoundException('genre not found');
     return genre;
     }

     async update(id:number, fields:Partial<UpdateGenreDto>):Promise<Genre>  {
      const genre=await this.findOne(id);
      if(!genre) throw new NotFoundException('genre not found');
      Object.assign(genre,fields);
      return await this.genreRepository.save(genre);
    }

  remove(id: number) {
    return `This action removes a #${id} genre`;
  }
}
