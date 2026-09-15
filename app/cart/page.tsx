import CartContent from "./CartContent";

export const metadata = {
  title: "Your Cart",
};

export default function CartPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">Your Cart</h1>
      <CartContent />
    </div>
  );
}