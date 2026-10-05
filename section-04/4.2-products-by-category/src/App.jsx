import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

const App = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // load the categories once, when the page opens
  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch("https://dummyjson.com/products/category-list");
        const data = await res.json();
        setCategories(data);
        setCategory(data[0]); // first category is selected automatically
      } catch (error) {
        console.log("Could not load categories", error);
      }
    }

    loadCategories();
  }, []);

  // load the products every time the category changes
  useEffect(() => {
    if (category === "") return;

    let ignore = false; // this request is still the latest one

    async function loadProducts() {
      setLoading(true);
      try {
        const res = await fetch(
          "https://dummyjson.com/products/category/" + category,
        );
        const data = await res.json();

        if (ignore) return; // a newer click happened, throw this result away

        setProducts(data.products);
        setLoading(false);
      } catch (error) {
        console.log("Could not load products", error);
        if (!ignore) setLoading(false);
      }
    }

    loadProducts();

    // runs when the category changes again
    return () => {
      ignore = true;
    };
  }, [category]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Products by category</h1>

      <div className="flex flex-wrap gap-2 mb-4 items-center justify-center">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={
              c === category
                ? "px-3 py-1 rounded bg-blue-600 text-white"
                : "px-3 py-1 rounded bg-gray-200"
            }
          >
            {c}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p className="mb-2">Number of products: {products.length}</p>
          <div className="flex flex-wrap gap-20 justify-center items-center ">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
