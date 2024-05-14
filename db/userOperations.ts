import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createUser(email: string, name: string) {
  const newUser = await prisma.user.create({
    data: {
      email: email,
      name: name,
    },
  });

  return newUser;
}

// Usage:
createUser('test@example.com', 'Test User')
  .then(user => console.log(`Created new user: ${user.email} (ID: ${user.id})`))
  .catch(error => console.error(`Something went wrong: ${error.message}`));
