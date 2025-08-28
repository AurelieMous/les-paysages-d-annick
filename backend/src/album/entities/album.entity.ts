import {Album, Photo} from "@prisma/client";

export class AlbumEntity implements Album{
    id: number;
    title: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    createdById: number;

    constructor(album: Album) {
        Object.assign(this, album);
    }
}
