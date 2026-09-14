import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "../../lib/format";

type ProductCardProps = {
  product: {
    id: number;
    name: string;
    slug: string;
    price: number;
    stock: number;
    images: string[];
  };
};

export default function ProductCard({ product }: ProductCardProps) {
  const soldOut = product.stock === 0;

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-neutral-100">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {soldOut && (
          <span className="absolute left-3 top-3 rounded bg-white px-2 py-1 text-xs font-medium">
            Sold out
          </span>
        )}
      </div>

      <div className="mt-3">
        <h3 className="line-clamp-1 text-sm font-medium">{product.name}</h3>
        <p className="mt-1 text-sm text-neutral-600">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}