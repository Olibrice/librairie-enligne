import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from 'src/users/entities/user.entity';
import { Genre } from './entities/genre.entity';
import { promises } from 'dns';

@Controller('genre')
@ApiTags('Genres')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Post()
  @ApiOperation({ description: 'creation genre' })
  @ApiResponse({
    description: 'successfully created.',
    type: Genre,
  }
  )
  async create(@Body() createGenreDto: CreateGenreDto, user:any):Promise<Genre>{
    return await this.genreService.create(createGenreDto,user);
  }
  @Get()
  @ApiOperation({ description: 'all genres' })
  @ApiResponse({
    description: 'successfully  retrieved.',
    type: Genre,
    isArray: true,
  } )
  findAll() {
    return this.genreService.findAll();
  }

  @Get(':id')
  @ApiOperation({ description: ' retrieving  one genre' })

  async findOne(@Param('id',ParseIntPipe) id: string) {
    return this.genreService.findOne(+id);

  }

  @Patch(':id')
  @ApiOperation({ description: 'updating  a genre' })

  update(@Param('id',ParseIntPipe) id: string, @Body() updateGenreDto: UpdateGenreDto) {
    return this.genreService.update(+id, updateGenreDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.genreService.remove(+id);
  }
}
