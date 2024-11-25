import { Controller, Get } from '@nestjs/common';

Controller('/albums');
export class AlbumControllers {
  @Get()
  getAlbums() {
    return {
      success: true,
      statusCode: 200,
      data: {
        albums: [{ 0: 'Chain Smokers ' }, { 1: 'One Direction' }],
      },
    };
  }
}
