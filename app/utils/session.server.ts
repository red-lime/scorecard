import bcrypt from "bcryptjs";

import { db } from "./db.server";

type LoginForm = {
  email: string;
  password: string;
};

export async function register({ email, password }: LoginForm) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await db.user.create({
    data: { email, passwordHash },
  });
  return { id: user.id, email };
}

export async function login({ email, password }: LoginForm) {
  const user = await db.user.findUnique({
    where: { email },
  });

  if (!user) return null;

  const isCorrectPassword = bcrypt.compare(password, user.passwordHash);

  if (!isCorrectPassword) return null;

  return { id: user.id, email };
}
