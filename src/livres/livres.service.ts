import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLivreDto } from './dto/create-livre.dto';
import { UpdateLivreDto } from './dto/update-livre.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Livre } from './entities/livre.entity';
import { Repository } from 'typeorm';
import { GenreService } from 'src/genre/genre.service';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class LivresService {
  constructor(@InjectRepository(Livre) private readonly bookRepository:Repository<Livre>,
  private readonly genreService: GenreService,
  ){}

  async create(createLivreDto: CreateLivreDto,currentUser:UserEntity):Promise<Livre> {
    const genre =await this.genreService.findOne(+createLivreDto.genreId);

    const book = this.bookRepository.create(createLivreDto);
    book.genre = genre;

    book.addBy=currentUser;
    return await this.bookRepository.save(book);
  }

  findAll() {
    return `This action returns all livres`;
  }

  async findOne(id: number) {
    const findBook=await this.bookRepository.findOne({
      where:{id:id},
      relations:{addBy:true,genre:true,},
      select:{
            addBy:{id:true,nom:true,prenom:true, email:true,},
            genre:{ id:true,genres:true}
             }
    });
    if (!findBook)throw new NotFoundException('Book by id `'+id+'` not found ');
  return findBook;
  }

  update(id: number, updateLivreDto: UpdateLivreDto) {
    return `This action updates a #${id} livre`;
  }

  remove(id: number) {
    return `This action removes a #${id} livre`;
  }
}
