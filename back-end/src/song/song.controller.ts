import {Controller, Get, Query} from '@nestjs/common';
import {SongDto} from './song.dto';
import {SongService} from './song.service';

@Controller("song")
export class SongController {

    constructor(private readonly songService: SongService) {
    }

    @Get()
    async search(@Query('query') query: string): Promise<SongDto[]> {
        return this.songService.search(query);
    }
}
