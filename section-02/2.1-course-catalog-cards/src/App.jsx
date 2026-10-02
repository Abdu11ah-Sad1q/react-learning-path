import { courses } from "./data/courses";
import CourseCard from "./components/CourseCard";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Explore Courses
          </h1>
          <p className="mt-2 text-base text-gray-600">
            Browse high-impact courses taught by industry professionals.
          </p>
        </header>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              title={course.title}
              teacher={course.teacher}
              level={course.level}
              duration={course.duration}
              price={course.price}
              image={course.image}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;
