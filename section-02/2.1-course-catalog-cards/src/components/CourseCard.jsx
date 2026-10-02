// src/components/CourseCard.jsx

const levelColors = {
  Beginner: "bg-emerald-100 text-emerald-800 border-emerald-200",
  Intermediate: "bg-amber-100 text-amber-800 border-amber-200",
  Advanced: "bg-rose-100 text-rose-800 border-rose-200",
};

const CourseCard = (props) => {
  const { title, teacher, level, duration, price, image } = props;

  //  Free courses show "Free" instead of "0 NOK"
  const formattedPrice = price === 0 ? "Free" : `${price} NOK`;

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
      {/* Cover Image */}
      <img src={image} alt={title} className="h-44 w-full object-cover" />

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-4">
        {/* Badges Container */}
        <div className="mb-2 flex flex-wrap items-center gap-2">
          {/*  Dynamic colored level badge */}
          <span
            className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
              levelColors[level] || "bg-gray-100 text-gray-800 border-gray-200"
            }`}
          >
            {level}
          </span>
          {/* Long course badge if duration is greater than 20 */}
          {duration > 20 && (
            <span className="rounded-full border border-purple-200 bg-purple-100 px-2.5 py-0.5 text-xs font-semibold text-purple-800">
              Long course
            </span>
          )}
        </div>

        {/* Title & Teacher */}
        <h3 className="line-clamp-2 text-lg font-bold leading-snug text-gray-900">
          {title}
        </h3>
        <p className="mt-1 text-sm text-gray-500">Instructor: {teacher}</p>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4 text-sm">
          <span className="font-medium text-gray-600">{duration} hrs</span>
          <span
            className={`text-base ${
              price === 0
                ? "font-extrabold text-emerald-600"
                : "font-bold text-gray-900"
            }`}
          >
            {formattedPrice}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
