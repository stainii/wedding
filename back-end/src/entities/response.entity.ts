import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { SongRequest } from './song-request.entity';

@Entity()
export class Response {
    @PrimaryKey()
    _id!: number;

    @Property({ nullable: true })
    names: string;

    @Property({ nullable: true })
    kidsNames: string;

    @Property({ nullable: true })
    vegetarian: string;

    @Property({ nullable: true })
    foodAllergies: string;

    @OneToMany(() => SongRequest, songRequest => songRequest.response)
    songRequests = new Collection<SongRequest>(this);

    @Property()
    createdAt: Date = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt: Date = new Date();

    @Property({ version: true })
    version!: number;
}
