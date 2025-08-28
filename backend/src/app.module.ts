import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumModule } from './album/album.module';
import { PhotoModule } from './photo/photo.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AlbumModule, PhotoModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
