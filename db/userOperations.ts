import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";


const prisma = new PrismaClient();

async function createUser(email: string, name: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      email: email,
      name: name,
      password: hashedPassword,
    },
  });

  return newUser;
}

// Usage:
createUser('test@example.com', 'Test User', 'securepassword')
  .then(user => console.log(`Created new user: ${user.email} (ID: ${user.id})`))
  .catch(error => console.error(`Something went wrong: ${error.message}`));
