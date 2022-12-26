import {Options} from "@mikro-orm/core";
import {Response} from "./entities/response.entity";
import {SongRequest} from "./entities/song-request.entity";

const mikroOrmPostgresConfig: Options = {
    type: 'postgresql',
    name: 'postgreSQL',
    host: process.env.MIKRO_ORM_HOST,
    port: Number.parseInt(process.env.MIKRO_ORM_PORT),
    user: process.env.MIKRO_ORM_USER,
    password: process.env.MIKRO_ORM_PASSWORD,
    dbName: process.env.MIKRO_ORM_DB_NAME,
    entities: [Response, SongRequest],
    migrations: {
        path: 'dist/migrations',
        pathTs: 'src/migrations',
    },
};

export default mikroOrmPostgresConfig;
