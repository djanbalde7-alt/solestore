import { signOut } from "../../auth";

export default function SignOutButton() {
  async function handleSignOut() {
    "use server";
    await signOut({ redirectTo: "/" });
  }

  return (
    <form action={handleSignOut}>
      <button type="submit" className="hover:text-neutral-600">
        Sign out
      </button>
    </form>
  );
}