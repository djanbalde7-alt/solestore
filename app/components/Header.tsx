import Link from "next/link";
import { auth } from "../../auth";
import CartLink from "./CartLink";
import SignOutButton from "./SignOutButton";
import MobileNav from "./MobileNav";

export default async function Header() {
  const session = await auth();
  const isAdmin = session?.user.role === "ADMIN";

  return (
    <header className="relative border-b border-neutral-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight">
          SoleStore
        </Link>

        <nav className="hidden items-center gap-6 text-sm sm:flex">
          <Link href="/products" className="hover:text-neutral-600">
            Shop
          </Link>

          {session && (
            <>
              <Link href="/account/orders" className="hover:text-neutral-600">
                Orders
              </Link>
              <Link href="/account/favorites" className="hover:text-neutral-600">
                Favorites
              </Link>
            </>
          )}

          {isAdmin && (
            <Link href="/admin" className="hover:text-neutral-600">
              Admin
            </Link>
          )}

          <CartLink />

          {session ? (
            <SignOutButton />
          ) : (
            <Link href="/signin" className="hover:text-neutral-600">
              Sign in
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-4 sm:hidden">
          <CartLink />
          <MobileNav isSignedIn={!!session} isAdmin={isAdmin} />
        </div>
      </div>
    </header>
  );
}