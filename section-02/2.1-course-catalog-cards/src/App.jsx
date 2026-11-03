// src/App.jsx
import { useState } from "react";
import { courses as initialCourses } from "./data/initialCourses.jsx";
import CourseCard from "./components/CourseCard.jsx";

const App = () => {
  const [courseList, setCourseList] = useState(initialCourses);

  const handleAddCourse = () => {
    const newCourse = {
      id: Date.now(), // Unique ID based on timestamp
      title: "Docker & Kubernetes Fundamentals",
      teacher: "Marcus Vance",
      level: "Intermediate",
      duration: 24, // Tests > 20 hrs ("Long course" badge)
      price: 0, // Tests price === 0 ("Free" label)
      image:
        "https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&w=600&q=80",
    };

    // Append new course immutably
    setCourseList((prevCourses) => [...prevCourses, newCourse]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header & Action Button */}
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Explore Courses
            </h1>
            <p className="mt-2 text-base text-gray-600">
              Browse high-impact courses taught by industry professionals.
            </p>
          </div>

          <button
            onClick={handleAddCourse}
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-95"
          >
            + Add Course
          </button>
        </header>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courseList.map((course) => (
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
