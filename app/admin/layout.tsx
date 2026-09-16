import Link from "next/link";
import { requireAdmin } from "../../lib/session";

export const metadata = {
  title: "Admin",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <div className="mb-8 flex flex-wrap items-center gap-6 border-b border-neutral-200 pb-4">
        <h1 className="text-lg font-bold tracking-tight">Admin</h1>

        <nav className="flex gap-5 text-sm">
          <Link href="/admin" className="hover:text-neutral-600">
            Overview
          </Link>
          <Link href="/admin/products" className="hover:text-neutral-600">
            Products
          </Link>
          <Link href="/admin/orders" className="hover:text-neutral-600">
            Orders
          </Link>
          <Link href="/admin/categories" className="hover:text-neutral-600">
            Categories
          </Link>
        </nav>
      </div>

      {children}
    </div>
  );
}