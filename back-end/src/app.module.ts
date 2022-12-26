import {MikroOrmMiddleware, MikroOrmModule} from '@mikro-orm/nestjs';
import {MiddlewareConsumer, Module, NestModule, OnModuleInit} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ResponseModule} from './response/response.module';
import {SongModule} from './song/song.module';
import {ConfigModule} from '@nestjs/config';
import {MikroORM} from "@mikro-orm/core";

@Module({
    imports: [
        ResponseModule,
        SongModule,
        MikroOrmModule.forRoot(),
        ConfigModule.forRoot(),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule, OnModuleInit {

    constructor(private readonly orm: MikroORM) {
    }

    async onModuleInit(): Promise<void> {
        await this.orm.getMigrator().up();
    }

    // for some reason the auth middlewares in profile and article modules are fired before the request context one,
    // so they would fail to access contextual EM. by registering the middleware directly in AppModule, we can get
    // around this issue
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(MikroOrmMiddleware)
            .forRoutes('*');
    }

}
