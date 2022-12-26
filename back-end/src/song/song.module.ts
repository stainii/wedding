import { Module } from '@nestjs/common';
import { SongController } from './song.controller';
import { SongService } from './song.service';
import { ConfigModule } from '@nestjs/config';

@Module({
    providers: [SongService],
    controllers: [SongController],
    exports: [SongService],
    imports: [
        ConfigModule,
    ]
})
export class SongModule {
}
