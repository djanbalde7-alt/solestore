import { redirect } from "next/navigation";
import { auth } from "../auth";

export async function requireUser() {
  const session = await auth();

  if (!session) {
    redirect("/signin");
  }

  return session.user;
}

export async function requireAdmin() {
  const session = await auth();

  if (!session) {
    redirect("/signin");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  return session.user;
}