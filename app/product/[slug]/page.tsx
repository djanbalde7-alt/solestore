import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  getProductBySlug,
  getProductReviews,
  hasPurchased,
  getUserReview,
} from "../../../lib/queries";
import { formatPrice } from "../../../lib/format";
import { auth } from "../../../auth";
import { isFavorited } from "../../actions/favorites";
import AddToCartButton from "../../components/AddToCartButton";
import FavoriteButton from "../../components/FavoriteButton";
import ReviewList from "../../components/ReviewList";
import ReviewForm from "../../components/ReviewForm";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Product not found" };
  }

  return {
    title: product.name,
    description: product.description.slice(0, 160),
    openGraph: {
      title: product.name,
      description: product.description.slice(0, 160),
      images: [product.images[0]],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product || !product.active) {
    notFound();
  }

  const session = await auth();
  const userId = session ? Number(session.user.id) : null;

  const favorited = await isFavorited(product.id);
  const reviews = await getProductReviews(product.id);
  const canReview = userId ? await hasPurchased(userId, product.id) : false;
  const existingReview = userId ? await getUserReview(userId, product.id) : null;

  const soldOut = product.stock === 0;
  const lowStock = product.stock > 0 && product.stock <= 5;

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <nav className="mb-8 text-sm text-neutral-500">
        <Link href="/products" className="hover:text-neutral-900">
          Shop
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/category/${product.category.slug}`}
          className="hover:text-neutral-900"
        >
          {product.category.name}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-neutral-900">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-neutral-100">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
            className="object-cover"
          />
        </div>

        <div className="flex flex-col">
          <p className="text-sm uppercase tracking-wide text-neutral-500">
            {product.category.name}
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            {product.name}
          </h1>

          <p className="mt-4 text-2xl font-semibold">
            {formatPrice(product.price)}
          </p>

          <p className="mt-6 leading-relaxed text-neutral-600">
            {product.description}
          </p>

          <div className="mt-8">
            <AddToCartButton productId={product.id} disabled={soldOut} />

            <FavoriteButton
              productId={product.id}
              initialFavorited={favorited}
              isSignedIn={!!session}
            />

            {lowStock && (
              <p className="mt-3 text-sm text-orange-600">
                Only {product.stock} left in stock
              </p>
            )}
          </div>
        </div>
      </div>

      <section className="mt-16 border-t border-neutral-200 pt-12">
        <h2 className="mb-8 text-xl font-semibold">Reviews</h2>

        <ReviewList reviews={reviews} />

        {canReview && !existingReview && (
          <div className="mt-10 border-t border-neutral-200 pt-8">
            <h3 className="mb-4 font-medium">Write a review</h3>
            <ReviewForm productId={product.id} />
          </div>
        )}
      </section>
    </div>
  );
}