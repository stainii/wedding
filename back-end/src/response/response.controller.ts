import {Body, Controller, Post} from '@nestjs/common';
import {ResponseDto} from './response.dto';
import {ResponseService} from './response.service';

@Controller("response")
export class ResponseController {

    constructor(private readonly responseService: ResponseService) {
    }

    @Post()
    async respond(@Body() responseDto: ResponseDto) {
        return this.responseService.save(responseDto);
    }
}
