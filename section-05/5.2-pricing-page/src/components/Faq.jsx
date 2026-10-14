import { useState } from "react";
import { faqs } from "../data";

function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  function toggle(index) {
    if (openIndex === index) {
      setOpenIndex(null); // clicked the open one, so close it
    } else {
      setOpenIndex(index); // open the clicked one
    }
  }

  return (
    <section id="faq" className="flex flex-col items-center gap-8 py-16 px-4">
      <h2 className="text-3xl">Frequently asked questions</h2>

      <div className="flex flex-col gap-3 w-full max-w-2xl">
        {faqs.map((faq, index) => (
          <div
            key={faq.question}
            className="flex flex-col gap-2 bg-gray-100 rounded-xl px-6 py-4"
          >
            <button
              onClick={() => toggle(index)}
              className="flex items-center gap-4 text-left"
            >
              <span className="text-gray-400">0{index + 1}</span>
              <span className="flex-1">{faq.question}</span>
              <span className="text-gray-400">
                {openIndex === index ? "▲" : "▼"}
              </span>
            </button>

            {openIndex === index && (
              <p className="text-gray-600 pl-10">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Faq;
