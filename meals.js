import fs from "node:fs";
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import { S3 } from "@aws-sdk/client-s3";
import { PrismaClient } from "@prisma/client";

const s3 = new S3({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
// const db = sql("meals.db");

const prisma = new PrismaClient();

export async function getMeals() {
  return await prisma.meal.findMany();
}

export async function getMeal(slug) {
  return await prisma.meal.findFirst({
    where: {
      slug,
    },
  });
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;

  // const stream = fs.createWriteStream(`public/images/${fileName}`);
  // const bufferedImage = await meal.image.arrayBuffer();

  s3.putObject({
    Bucket: "den-my-burguers.s3.amazonaws.com",
    Key: fileName,
    Body: Buffer.from(bufferedImage),
    ContentType: meal.image.type,
  });

  meal.image = fileName;

  await prisma.meal.create({
    meal,
  });

  // db.prepare(
  //   `
  //   INSERT INTO meals
  //     (title, summary, instructions, creator, creator_email, image, slug)
  //     VALUES (
  //        @title,
  //        @summary,
  //        @instructions,
  //        @creator,
  //        @creator_email,
  //        @image,
  //        @slug
  //     )
  //   `
  // ).run(meal);
}
