import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {  ApiOperation, ApiParam, ApiResponse,ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UserSignInDto } from './dto/UserSignInDto';
import { UserEntity } from './entities/user.entity';
import { create } from 'domain';
@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  @ApiOperation({ description: 'this is the endpoint for Creating  a user' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: CreateUserDto,
  })
  async create(@Body() body: CreateUserDto){
       return {user:await this.usersService.create(body)};
    }
    @Post('signin')
    async signin(@Body() userSignInDto: UserSignInDto): Promise<{
      accessToken: string;
      user: UserEntity;
  }>
      {
        const user= await this.usersService.signin(userSignInDto);
        const accessToken= await this.usersService.accessToken(user);
        return {accessToken,user};
      }
      @Get('all')
      @ApiOperation({
        description: 'tous les utilisateurs',
      })
      @ApiResponse({
        type: CreateUserDto,
        description: ' operation reussie',
        isArray: true,
      })
      async findAll(): Promise<UserEntity[]> {
        return await this.usersService.findAll();
      }
      @Get('single/:id')
      @ApiResponse({
        status: 200,
        description: 'The found record',
        type: CreateUserDto,
        isArray: true,
        })
        @ApiParam({
          name: 'id',
            type: 'string',
          description:'id user'
        })
        @ApiOperation({
          description: 'recherche un utilisateur',
        })
      async findOne(@Param('id',ParseIntPipe) id: string) {
        return await this.usersService.findOne(+id);
      }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
