import React from "react";
import { motion } from "framer-motion";

const RecipeList = ({ recipes, loading }) => {
  if (loading) {
    return <p className="text-center mt-8">Loading...</p>;
  }

  if (!recipes.length) {
    return (
      <p className="text-center mt-8">
        No recipes found. Try searching for something else!
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 py-8 max-w-screen-lg">
      {recipes.map((recipe) => (
        <motion.div
          key={recipe.id}
          className="bg-white rounded shadow-md p-4 hover:shadow-lg flex flex-col items-center"
          whileHover={{ scale: 1.05 }}
        >
          <img
            src={recipe.image}
            alt={recipe.title}
            className="rounded mb-4 w-full h-48 object-cover"
          />
          <h3 className="font-bold text-lg text-center">{recipe.title}</h3>
          <p className="text-sm text-gray-600">
            Ready in {recipe.readyInMinutes} minutes
          </p>
          <a
            href={recipe.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline mt-2"
          >
            View Recipe
          </a>
        </motion.div>
      ))}
    </div>
  );
};

export default RecipeList;
