import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function createUser(email: string, name: string, password: string) {
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
// createUser('test@example.com', 'Test User', 'securepassword')
//   .then(user => console.log(`Created new user: ${user.email} (ID: ${user.id})`))
//   .catch(error => console.error(`Something went wrong: ${error.message}`));

export async function verifyUser(username: string, password: string) {
  // Fetch the user with the given username from the db
  const user = await prisma.user.findUnique({
    where: {
      email: username,
    },
  });

  // If no user was not found
  if (!user) {
    throw new Error("User not found");
  }

  // Compare the provided password with the hashed password
  const passwordIsValid = await bcrypt.compare(password, user.password);

  // If the password is wrong
  if (!passwordIsValid) {
    throw new Error("Invalid password");
  }

  return user;
}
