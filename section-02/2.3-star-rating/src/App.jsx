import StarRating from "./components/StarRating";

const App = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Rate your experience</h1>
      <StarRating title="Food" />
      <StarRating title="Service" />
      <StarRating title="Price" />
    </div>
  );
}

export default App;