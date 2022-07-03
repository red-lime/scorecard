import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  const mario = await db.user.create({
    data: {
      email: "mario",
      passwordHash:
        "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
    },
  });
  return mario;
}

seed();
