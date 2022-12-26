import { SongDto } from '../song/song.dto';

export class ResponseDto {
    names: string;
    kidsNames: string;
    vegetarian: string;
    foodAllergies: string;
    songRequest: SongDto;
}
