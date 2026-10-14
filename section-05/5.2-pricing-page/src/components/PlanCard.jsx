function PlanCard({ plan, yearly }) {
  // yearly = 10 months of the monthly price (2 months free)
  let price = plan.monthlyPrice;
  let period = "month";
  if (yearly) {
    price = plan.monthlyPrice * 10;
    period = "year";
  }

  return (
    <div className="flex flex-col items-center w-72">
      {/* white price box that sits on top of the colored card */}
      <div className="relative z-10 flex flex-col items-center justify-center w-52 h-28 bg-white rounded-lg shadow-lg">
        <p className={"tracking-widest " + plan.textColor}>{plan.name}</p>
        <p className={"text-2xl font-bold " + plan.textColor}>
          {price.toLocaleString("en-US")} NOK
        </p>
        <p className="text-xs text-gray-500">per {period}</p>
      </div>

      {/* colored card, pulled up behind the price box with a negative margin */}
      <div
        className={
          "flex flex-col items-center gap-4 w-full -mt-24 pt-28 pb-8 rounded-lg text-white " +
          plan.cardColor
        }
      >
        {plan.features.map((feature) => (
          <p key={feature} className="text-sm">
            {feature}
          </p>
        ))}
        <button className="mt-6 bg-white text-black px-10 py-2 rounded text-sm tracking-widest">
          CHOOSE PLAN
        </button>
      </div>
    </div>
  );
}

export default PlanCard;
