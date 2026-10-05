const RecipeCard = (props) => {
  const { recipe, onClick } = props;
  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  return (
    <div
      onClick={onClick}
      className="border rounded cursor-pointer hover:shadow-lg bg-white"
    >
      <img
        src={recipe.image}
        alt={recipe.name}
        className="w-full h-40 object-cover rounded-t"
      />
      <div className="p-3">
        <h2 className="font-bold">{recipe.name}</h2>
        <p>Cuisine: {recipe.cuisine}</p>
        <p>Difficulty: {recipe.difficulty}</p>
        <p>Total time: {totalTime} min</p>
        <p>Rating: ⭐ {recipe.rating}</p>
      </div>
    </div>
  );
};

export default RecipeCard;
