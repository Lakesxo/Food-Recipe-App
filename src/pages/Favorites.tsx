import Header from "../components/Header/Header";
import Heading from "../components/Heading/Heading";
import RecipeAlbum from "../components/RecipeAlbum/RecipeAlbum";
import { useEffect, useState } from "react";

interface FavoritesProps {}

interface IFavoriteMeal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
}

const Favorites: React.FunctionComponent<FavoritesProps> = () => {
  const [mealArray, setMealArray] = useState<IFavoriteMeal[]>([]);

  let favorites = localStorage.getItem("favoriteMeals");
  useEffect(() => {
    if (favorites) {
      setMealArray(JSON.parse(favorites));
    }
  }, [favorites]);

  return (
    <div>
      <Header />
      <div className="areaCnt">
        <Heading title="Favorites" />
        <div className="flexAreaMeals">
          {mealArray.length < 1 ? (
            <>You currently do not have any favorite recipes</>
          ) : (
            mealArray.map((meal: IFavoriteMeal) => (
              <RecipeAlbum
                key={meal.idMeal}
                id={meal.idMeal}
                imageLink={meal.strMealThumb}
                recipeName={meal.strMeal}
                categoryName={meal.strCategory}
                areaName={meal.strArea}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
