function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-5">
      <h2 className="text-xl font-bold">planora</h2>

      <div className="flex gap-10 text-sm">
        <a href="#">Features</a>
        <a href="#pricing">Pricing</a>
        <a href="#reviews">Reviews</a>
        <a href="#faq">FAQ</a>
      </div>

      <button className="border border-black rounded-lg px-5 py-1 text-sm">
        Log in
      </button>
    </nav>
  );
}

export default Navbar;
