import { testimonials } from "../data";

function Testimonials() {
  return (
    <section
      id="reviews"
      className="flex flex-col items-center gap-10 py-16 px-10 bg-gray-100"
    >
      <h2 className="text-3xl">What our customers say</h2>

      {/* flex-wrap: a 4th testimonial moves to the next row if there is no space */}
      <div className="flex flex-wrap justify-center gap-10">
        {testimonials.map((item) => (
          <div key={item.name} className="flex flex-col gap-3 w-72 font-serif">
            <p className="text-yellow-500">★★★★★</p>
            <h3 className="text-xl font-bold">"{item.title}"</h3>
            <p className="text-gray-700">{item.text}</p>
            <p className="text-sm font-bold">- {item.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
