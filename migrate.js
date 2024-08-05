const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const sql = require("better-sqlite3");
const db = sql("meals.db");

let meals = [];

// db.serialize(() => {
//   db.each(`SELECT title, summary, instructions, creator, creator_email, image, slug FROM meals`, (err, row) => {
//     if (err) {
//       console.error(err.message);
//     }
//     meals.push(row);
//   });
// });

// db.close();

const test = async () => {
//   const meals = await db.prepare("SELECT * FROM meals").all();

//   for (const meal of meals) {
//     console.log('migrate', meal)
//     await prisma.meal.create({
//       data: {
//         title: meal.title,
//         summary: meal.summary,
//         instructions: meal.instructions,
//         creator: meal.creator,
//         creatorEmail: meal.creator_email,
//         image: meal.image,
//         slug: meal.slug,
//       },
//     });
//   }

  console.log( await prisma.meal.findMany())

  
};

test();
