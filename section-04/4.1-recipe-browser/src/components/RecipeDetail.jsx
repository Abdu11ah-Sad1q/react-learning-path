const RecipeDetail = (props) => {
  const { recipe, onBack } = props;
  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  return (
    <div>
      <button onClick={onBack} className="bg-gray-200 px-3 py-1 rounded mb-4">
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-2">{recipe.name}</h1>
      <img
        src={recipe.image}
        alt={recipe.name}
        className="w-full max-w-md h-60 object-cover rounded mb-2"
      />
      <p>
        {recipe.cuisine} | {recipe.difficulty} | {totalTime} min | ⭐{" "}
        {recipe.rating}
      </p>

      <h2 className="text-xl font-bold mt-4 mb-1">Ingredients</h2>
      <ul className="list-disc ml-6">
        {recipe.ingredients.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h2 className="text-xl font-bold mt-4 mb-1">Instructions</h2>
      <ol className="list-decimal ml-6">
        {recipe.instructions.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  );
};

export default RecipeDetail;
