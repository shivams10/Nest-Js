import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateAlbumDTO } from 'src/dto';
import { AlbumService } from 'src/services/albums.service';

Controller('/albums');
export class AlbumControllers {
  constructor(private albumService: AlbumService) {}

  @Post()
  createAlbum(@Body() createAlbumDto: CreateAlbumDTO) {
    this.albumService.addAlbum(createAlbumDto);
    return {
      message: 'Album added successfully',
      data: {
        success: true,
        status: 201,
        data: createAlbumDto,
      },
    };
  }

  @Get()
  getAllAlbums() {
    return this.albumService.getAllAlbums();
  }

  @Get(':id')
  getAlbum(@Param('id') id: number) {
    return this.albumService.getAlbum(+id);
  }

  @Put(':id')
  updateAlbum(@Param('id') id: number, @Body() updateUserDto: CreateAlbumDTO) {
    this.albumService.updateAlbum(+id, updateUserDto);
    return {
      message: 'Album updated successfully',
      data: {
        success: true,
        status: 200,
      },
    };
  }

  @Delete(':id')
  deleteAlbum(@Param('id') id: number) {
    this.albumService.deleteAlbum(+id);
    return {
      message: 'Album deleted successfully',
      data: {
        success: true,
        status: 200,
      },
    };
  }
}
