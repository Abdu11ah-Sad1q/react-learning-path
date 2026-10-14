function Navbar() {
  return (
    <nav className="flex mt-10 flex-wrap justify-between items-center gap-4 px-6 md:px-20 py-6">
      <h2 className="text-5xl font-bold">planora</h2>

      {/* phone: full-width row at the bottom | desktop (md): normal, in the middle */}
      <div className="flex text-2xl font-sembold justify-center gap-6 md:gap-10 w-full order-last md:w-auto md:order-none ">
        <a href="#">Features</a>
        <a href="#pricing">Pricing</a>
        <a href="#reviews">Reviews</a>
        <a href="#faq">FAQ</a>
      </div>

      <button className="border border-black rounded-lg px-5 py-2 text-2xl">
        Log in
      </button>
    </nav>
  );
}

export default Navbar;
