"use client";

import { useState } from "react";
import Link from "next/link";

type Props = {
  isSignedIn: boolean;
  isAdmin: boolean;
};

export default function MobileNav({ isSignedIn, isAdmin }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="sm:hidden">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        className="p-2"
      >
        <span className="block h-0.5 w-5 bg-neutral-900" />
        <span className="mt-1 block h-0.5 w-5 bg-neutral-900" />
        <span className="mt-1 block h-0.5 w-5 bg-neutral-900" />
      </button>

      {open && (
        <nav className="absolute left-0 right-0 top-full z-40 border-b border-neutral-200 bg-white px-6 py-4">
          <ul className="flex flex-col gap-3 text-sm">
            <li>
              <Link href="/products" onClick={() => setOpen(false)}>
                Shop
              </Link>
            </li>
            <li>
              <Link href="/cart" onClick={() => setOpen(false)}>
                Cart
              </Link>
            </li>

            {isSignedIn && (
              <>
                <li>
                  <Link href="/account/orders" onClick={() => setOpen(false)}>
                    Orders
                  </Link>
                </li>
                <li>
                  <Link href="/account/favorites" onClick={() => setOpen(false)}>
                    Favorites
                  </Link>
                </li>
              </>
            )}

            {isAdmin && (
              <li>
                <Link href="/admin" onClick={() => setOpen(false)}>
                  Admin
                </Link>
              </li>
            )}

            {!isSignedIn && (
              <li>
                <Link href="/signin" onClick={() => setOpen(false)}>
                  Sign in
                </Link>
              </li>
            )}
          </ul>
        </nav>
      )}
    </div>
  );
}