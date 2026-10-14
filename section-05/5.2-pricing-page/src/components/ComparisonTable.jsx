import { plans, comparisonLabels } from "../data";

function ComparisonTable() {
  return (
    <section className="flex flex-col items-center gap-8 py-16 px-4">
      <h2 className="text-3xl">Compare the plans</h2>

      <div className="flex py-8 px-6 bg-white rounded-2xl shadow-lg">
        {/* Column 1: the labels */}
        <div className="flex flex-col pr-6">
          <div className="h-16"></div>
          {comparisonLabels.map((label) => (
            <div
              key={label}
              className="flex items-center justify-end h-12 font-semibold"
            >
              {label}
            </div>
          ))}
        </div>

        {/* One more column for each plan */}
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="flex flex-col w-40 border-l border-gray-300"
          >
            <div className="flex items-center justify-center h-16 font-bold italic text-gray-500">
              {plan.name}
            </div>
            {plan.details.map((value, index) => (
              <div
                key={index}
                className="flex items-center justify-center h-12 text-gray-600"
              >
                {value}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export default ComparisonTable;
