import {MikroOrmModule} from "@mikro-orm/nestjs";
import {Module} from '@nestjs/common';
import {ResponseController} from "./response.controller";
import {ResponseService} from "./response.service";
import {Response} from '../entities/response.entity';
import {SongModule} from "../song/song.module";
import {SongRequest} from "../entities/song-request.entity";

@Module({
    imports: [
        MikroOrmModule.forFeature([Response]),
        SongModule
    ],
    providers: [ResponseService],
    controllers: [ResponseController],
})
export class ResponseModule {
}
