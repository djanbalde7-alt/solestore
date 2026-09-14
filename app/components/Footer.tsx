export default function Footer() {
  return (
    <footer className="border-t border-neutral-200">
      <div className="mx-auto max-w-7xl px-6 py-8 text-sm text-neutral-500">
        <p>© {new Date().getFullYear()} SoleStore. All rights reserved.</p>
      </div>
    </footer>
  );
}