import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Response } from './response.entity';

@Entity()
export class SongRequest {
    @PrimaryKey()
    _id!: number;

    @Property()
    title!: string;

    @Property()
    artist!: string;

    @Property()
    createdAt: Date = new Date();

    @ManyToOne(() => Response)
    response!: Response;

    @Property({ onUpdate: () => new Date() })
    updatedAt: Date = new Date();

    @Property({ version: true })
    version!: number;
}
