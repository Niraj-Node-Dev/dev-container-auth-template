import { MigrationInterface, QueryRunner } from 'typeorm';

export class All1735043967652 implements MigrationInterface {
  name = 'All1735043967652';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "internal_comment" character varying(300), "is_verified" boolean NOT NULL DEFAULT false, "deleted_at" TIMESTAMP WITH TIME ZONE, "user_id" uuid, "role_id" uuid, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "role_available" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "internal_comment" character varying(300), "is_verified" boolean NOT NULL DEFAULT false, "name" character varying(300) NOT NULL, "description" character varying(300), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_3e2c63f111318b9ffbe54d9bdb2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_user_role_available" ON "role_available" ("name") `,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "internal_comment" character varying(300), "is_verified" boolean NOT NULL DEFAULT false, "email" character varying(300) NOT NULL, "first_name" character varying(300) NOT NULL, "last_name" character varying(300), "salt" character varying(300), "password_hash" character varying(300), "access_token" character varying, "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_UQ_user_email" ON "users" ("email") `,
    );
    await queryRunner.query(
      `ALTER TABLE "role" ADD CONSTRAINT "FK_e3583d40265174efd29754a7c57" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "role" ADD CONSTRAINT "FK_df46160e6aa79943b83c81e496e" FOREIGN KEY ("role_id") REFERENCES "role_available"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "role" DROP CONSTRAINT "FK_df46160e6aa79943b83c81e496e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "role" DROP CONSTRAINT "FK_e3583d40265174efd29754a7c57"`,
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_UQ_user_email"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_user_role_available"`);
    await queryRunner.query(`DROP TABLE "role_available"`);
    await queryRunner.query(`DROP TABLE "role"`);
  }
}
