import { Migration } from '@mikro-orm/migrations';

export class Migration20220909201507 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "response" ("_id" serial primary key, "names" varchar(255) null, "kids_names" varchar(255) null, "vegetarian" varchar(255) null, "food_allergies" varchar(255) null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "version" int not null default 1);');

    this.addSql('create table "song_request" ("_id" serial primary key, "title" varchar(255) not null, "artist" varchar(255) not null, "created_at" timestamptz(0) not null, "response__id" int not null, "updated_at" timestamptz(0) not null, "version" int not null default 1);');

    this.addSql('alter table "song_request" add constraint "song_request_response__id_foreign" foreign key ("response__id") references "response" ("_id") on update cascade;');
  }

}
