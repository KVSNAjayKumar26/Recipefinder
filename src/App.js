import React, { useState } from "react";
import axios from "axios";
import RecipeList from "./components/RecipeList";
import SearchBar from "./components/SearchBar";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch recipes from Spoonacular API
  const fetchRecipes = async (query) => {
    setLoading(true);

    // Use environment variable or fallback for debugging
    const apiKey = process.env.REACT_APP_SPOONACULAR_API_KEY || "c524575217664ef59cf4baaca733c570";

    try {
      const response = await axios.get(
        "https://api.spoonacular.com/recipes/complexSearch",
        {
          params: {
            query: query,
            apiKey: apiKey, // Ensure the API key is included here
            number: 10, // Fetch 10 recipes
            addRecipeInformation: true, // Include detailed recipe info
            instructionsRequired: true, // Only fetch recipes with instructions
          },
        }
      );

      // Update the state with fetched recipes
      setRecipes(response.data.results);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      const errorMsg = error.response?.status === 401
        ? "Unauthorized! Check your API key."
        : "Something went wrong while fetching recipes.";
      alert(errorMsg); // Show a user-friendly error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <h1 className="text-4xl font-bold my-6">Recipe Finder</h1>
      <SearchBar onSearch={fetchRecipes} />
      <div className="w-full flex justify-center">
        <RecipeList recipes={recipes} loading={loading} />
      </div>
    </div>
  );
};

export default App;
