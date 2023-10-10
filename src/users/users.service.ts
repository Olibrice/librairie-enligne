import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserSignInDto } from './dto/UserSignInDto';
import { sign } from 'jsonwebtoken';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    
    if(createUserDto.password !== createUserDto.confirm_password) {
      throw new BadRequestException("Passwords not match");
    }
    const user1 = await this.usersRepository.findOne({where : {username: createUserDto.username}})
    if(user1) {
      throw new BadRequestException("Username  exists");
    }
    delete createUserDto.confirm_password;
    const salt = await bcrypt.genSalt()
    createUserDto.password = await bcrypt.hash(createUserDto.password, salt)
    const user = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(user);
  }
  async signin(userSignInDto: UserSignInDto):Promise<UserEntity>{
    const user = await this.usersRepository.createQueryBuilder("users")
    .addSelect("users.password")
    .where("users.username = :username", {username: userSignInDto.username}).getOne();
    if(!user) throw new BadRequestException("Username does not exist");
    const isMatch = await bcrypt.compare(userSignInDto.password, user.password)
    if(!isMatch) throw new BadRequestException("Password is incorrect");
    delete user.password; 
    return user;
  
  }
  async findAll(): Promise<UserEntity[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.usersRepository.findOneBy({id})
    if(!user) throw new NotFoundException('user not found.');
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
  async findUsername(username:string){
    return await this.usersRepository.findOneBy({username});
  }
  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  async accessToken (user:UserEntity): Promise<string>{
    return sign({id:user.id,username:user.username},
      process.env.ACCESS_TOKEN_SECRET_KEY,
      {expiresIn:process.env.ACCESS_TOKEN_EXPIRE_TIME});
  }
}
