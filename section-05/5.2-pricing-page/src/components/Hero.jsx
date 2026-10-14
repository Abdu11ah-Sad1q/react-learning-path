import Navbar from "./Navbar";
import heroImage from "../assets/hero.avif";

function Hero() {
  return (
    <section
      className="flex flex-col min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url(" + heroImage + ")" }}
    >
      <Navbar />

      {/* flex-1 = take all the space below the navbar, items-center = middle */}
      <div className="flex flex-1 items-center px-10 md:px-20">
        <div className="flex flex-col gap-8 max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-semibold leading-tight">
            Plan your work, not your pricing.
          </h1>

          <p className="text-5xl md:text-xl text-gray-700">
            Planora keeps your projects and your team in one place. Pick a plan,
            pay monthly or yearly, and cancel any time.
          </p>

          <div className="flex gap-4 items-center">
            <a
              href="#pricing"
              className="bg-white px-8 py-4 rounded-lg font-semibold shadow"
            >
              See plans
            </a>
            <button className="flex text-4xl items-center justify-center bg-white w-12 h-12 rounded-full shadow">
              ▶
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
