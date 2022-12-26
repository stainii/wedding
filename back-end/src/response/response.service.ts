import { Injectable } from '@nestjs/common';
import { ResponseDto } from './response.dto';
import { Response } from '../entities/response.entity';
import { SongRequest } from '../entities/song-request.entity';
import { SongService } from '../song/song.service';
import { EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class ResponseService {

    constructor(@InjectRepository(Response) private readonly responseRepository: EntityRepository<Response>,
                private readonly songService: SongService) {
    }

    async save(responseDto: ResponseDto) {
        const response = new Response();
        response.foodAllergies = responseDto.foodAllergies;
        response.names = responseDto.names;
        response.kidsNames = responseDto.kidsNames;
        response.vegetarian = responseDto.vegetarian;

        if (responseDto.songRequest) {
            const songDto = await this.songService.findById(
                responseDto.songRequest.id,
            );

            const songRequest = new SongRequest();
            songRequest.title = songDto.title;
            songRequest.artist = songDto.artist;
            songRequest.response = response;
            response.songRequests.add(songRequest);
        }

        console.info('Saving', response);
        return this.responseRepository.persistAndFlush(response);
    }
}
