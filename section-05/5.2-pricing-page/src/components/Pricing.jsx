import { useState } from "react";
import { plans } from "../data";
import PlanCard from "./PlanCard";

function Pricing() {
  // false = monthly prices, true = yearly prices
  const [yearly, setYearly] = useState(false);

  // the active button is blue, the other one is white
  const activeStyle = "bg-blue-900 text-white px-6 py-2 rounded";
  const normalStyle = "bg-white text-black px-6 py-2 rounded";

  return (
    <section
      id="pricing"
      className="flex flex-col items-center gap-10 bg-gray-200 py-16 px-4"
    >
      <h2 className="text-4xl">Simple pricing for every team</h2>

      <div className="flex flex-col items-center gap-2">
        <div className="flex gap-2">
          <button
            onClick={() => setYearly(false)}
            className={yearly ? normalStyle : activeStyle}
          >
            Monthly
          </button>
          <button
            onClick={() => setYearly(true)}
            className={yearly ? activeStyle : normalStyle}
          >
            Yearly
          </button>
        </div>
        <p className="text-sm text-gray-600">Yearly = 2 months free</p>
      </div>

      <div className="flex flex-wrap justify-center gap-8">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} yearly={yearly} />
        ))}
      </div>
    </section>
  );
}

export default Pricing;
