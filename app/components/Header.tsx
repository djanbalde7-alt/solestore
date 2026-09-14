import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-neutral-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight">
          SoleStore
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <Link href="/products" className="hover:text-neutral-600">
            Shop
          </Link>
          <Link href="/category/running" className="hover:text-neutral-600">
            Running
          </Link>
          <Link href="/category/basketball" className="hover:text-neutral-600">
            Basketball
          </Link>
        </nav>
      </div>
    </header>
  );
}