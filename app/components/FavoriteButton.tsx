"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toggleFavorite } from "../actions/favorites";

type Props = {
  productId: number;
  initialFavorited: boolean;
  isSignedIn: boolean;
};

export default function FavoriteButton({
  productId,
  initialFavorited,
  isSignedIn,
}: Props) {
  const router = useRouter();
  const [favorited, setFavorited] = useState(initialFavorited);
  const [pending, startTransition] = useTransition();

  function handleClick() {
    if (!isSignedIn) {
      router.push("/signin");
      return;
    }

    setFavorited((current) => !current);

    startTransition(async () => {
      const result = await toggleFavorite(productId);

      if (result.error) {
        setFavorited((current) => !current);
      }
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={pending}
      aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
      className="mt-3 w-full rounded-lg border border-neutral-300 py-3 font-medium transition hover:border-neutral-900 disabled:opacity-50"
    >
      {favorited ? "♥ Saved" : "♡ Save"}
    </button>
  );
}