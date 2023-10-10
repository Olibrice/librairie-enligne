import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GenreModule } from './genre/genre.module';
import { LivresModule } from './livres/livres.module';

@Module({
  imports: [UsersModule, GenreModule, LivresModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
