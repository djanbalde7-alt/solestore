import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "../../auth";
import SignUpForm from "./SignUpForm";

export const metadata = {
  title: "Create account",
};

export default async function SignUpPage() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <div className="mx-auto max-w-sm px-6 py-16">
      <h1 className="mb-8 text-2xl font-bold tracking-tight">Create account</h1>

      <SignUpForm />

      <p className="mt-6 text-sm text-neutral-600">
        Already have an account?{" "}
        <Link href="/signin" className="underline hover:text-neutral-900">
          Sign in
        </Link>
      </p>
    </div>
  );
}