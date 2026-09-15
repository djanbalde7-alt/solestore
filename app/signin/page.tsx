import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "../../auth";
import SignInForm from "./SignInForm";

export const metadata = {
  title: "Sign in",
};

export default async function SignInPage() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <div className="mx-auto max-w-sm px-6 py-16">
      <h1 className="mb-8 text-2xl font-bold tracking-tight">Sign in</h1>

      <SignInForm />

      <p className="mt-6 text-sm text-neutral-600">
        No account?{" "}
        <Link href="/signup" className="underline hover:text-neutral-900">
          Create one
        </Link>
      </p>
    </div>
  );
}