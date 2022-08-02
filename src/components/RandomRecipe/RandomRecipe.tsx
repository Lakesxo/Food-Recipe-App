import Heading from "../Heading/Heading";
import RecipeAlbum from "../RecipeAlbum/RecipeAlbum";
import "./RandomRecipe.scss";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

interface RandomRecipeProps {
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

interface IRandomMeal {
  idMeal: string;
  strMealThumb: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
}

const RandomRecipe: React.FunctionComponent<RandomRecipeProps> = ({
  setErrorMessage,
}) => {
  const [randomMeal, setRandomMeal] = useState<IRandomMeal[]>([]);

  const getRandomMeal = useCallback(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/random.php")
      .then((res) => {
        setRandomMeal(res.data.meals);
      })
      .catch((err) => setErrorMessage(err.message));
  }, [setErrorMessage]);

  useEffect(() => {
    if (randomMeal.length < 1) {
      getRandomMeal();
    }
  }, [randomMeal, getRandomMeal]);

  useEffect(() => {
    const timer = setTimeout(() => {
      getRandomMeal();
    }, 180000);
    return () => clearTimeout(timer);
  });

  return (
    <div className="randomWrapper">
      <Heading title="Random Recipe" />
      <div className="centRndm">
        {randomMeal.map((meal: IRandomMeal) => (
          <RecipeAlbum
            key={meal.idMeal}
            id={meal.idMeal}
            imageLink={meal.strMealThumb}
            recipeName={meal.strMeal}
            categoryName={meal.strCategory}
            areaName={meal.strArea}
          />
        ))}
      </div>
    </div>
  );
};

export default RandomRecipe;
