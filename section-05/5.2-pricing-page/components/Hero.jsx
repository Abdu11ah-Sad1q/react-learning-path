import Navbar from "./Navbar";

function Hero() {
  return (
    <section className="bg-cover bg-center min-h-96 bg-[url('https://unsplash.com/photos/person-writing-on-notebook-R8kRvIvZ0IY')]">
      {/* light pink layer on top of the photo so the text stays readable */}
      <div className="bg-pink-100/80 min-h-96">
        <Navbar />

        <div className="flex flex-col gap-6 px-10 py-16">
          <h1 className="text-6xl font-semibold">
            Plan your work, <br /> not your pricing.
          </h1>
          <p className="text-gray-700">
            Planora keeps your projects and your team in one place. <br />
            Pick a plan, pay monthly or yearly, and cancel any time.
          </p>
          <div className="flex gap-4 items-center">
            <a
              href="#pricing"
              className="bg-white px-6 py-3 rounded-lg text-sm font-semibold"
            >
              See plans
            </a>
            <button className="bg-white w-10 h-10 rounded-full">▶</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
