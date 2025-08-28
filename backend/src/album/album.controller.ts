import {Controller, Get, Post, Body, Patch, Param, Delete, Req} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  // @UseGuards(JwtAuthGuard) a implémenter car permet de vérifier si user existe
  create(@Body() createAlbumDto: CreateAlbumDto,
         @Req() req: Request & { user: any }) {
    return this.albumService.create(createAlbumDto, req.user.id);
  }

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.albumService.findOne(+id);
  }

  @Patch(':id')
  // @UseGuards(JwtAuthGuard) a implémenter car permet de vérifier si user existe
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    return this.albumService.update(+id, updateAlbumDto);
  }

  @Delete(':id')
  // @UseGuards(JwtAuthGuard) a implémenter car permet de vérifier si user existe
  remove(@Param('id') id: string) {
    return this.albumService.remove(+id);
  }
}
