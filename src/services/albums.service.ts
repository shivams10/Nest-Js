import { Injectable } from '@nestjs/common';

interface Album {
  id: number;
  name: string;
  artist: string;
}

@Injectable()
export class AlbumService {
  private store = new Map<number, Album>();

  addAlbum(album: Album) {
    this.store.set(album.id, album);
  }

  getAllAlbums() {
    return Array.from(this.store).map((_, album) => album);
  }

  getAlbum(id: number) {
    this.store.get(id);
  }

  updateAlbum(id: number, album: Album) {
    this.store.set(id, album);
  }

  deleteAlbum(id: number) {
    this.store.delete(id);
  }
}
