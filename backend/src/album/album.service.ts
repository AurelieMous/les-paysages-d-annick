import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import {PrismaService} from "../prisma/prisma.service";
import {AlbumEntity} from "./entities/album.entity";

@Injectable()
export class AlbumService {
    constructor(
        private readonly prisma: PrismaService,
    ) {}
  async create(createAlbumDto: CreateAlbumDto, admin: number) {
        const { title, description } = createAlbumDto;
        const newAlbum = await this.prisma.album.create({
         data: {
             title,
             description,
             createdById: admin
         },
     });
     return new AlbumEntity(newAlbum)
  }

  findAll() {
      this.prisma.album.findMany();
  }

  findOne(id: number) {
    return this.prisma.album.findUnique({
        where: {id}
    });
  }

  async update(id: number, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.prisma.album.update({
        where: {id},
        data: updateAlbumDto,
    });
    return new AlbumEntity(album)
  }

  remove(id: number) {
    return this.prisma.album.delete({
        where: {id},
    });
  }
}
