import Header from "../components/Header/Header";
import Heading from "../components/Heading/Heading";
import RecipeAlbum from "../components/RecipeAlbum/RecipeAlbum";
import axios from "axios";
import { useEffect, useState } from "react";
import { Alert } from "antd";

interface AreaProps {}

interface IAreaMeal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

const Area: React.FunctionComponent<AreaProps> = () => {
  const mealId = window.location.pathname.split("/")[2];
  const [mealArray, setMealArray] = useState<IAreaMeal[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${mealId}`)
      .then((res) => setMealArray(res.data.meals))
      .catch((err) => setErrorMessage(err.message));
  }, [mealId]);

  return (
    <div>
      <Header />
      {errorMessage && (
        <Alert
          message={errorMessage}
          description="Please check your connection and refresh."
          type="error"
          showIcon
          closable
        />
      )}
      <div className="areaCnt">
        {mealArray.length > 0 && <Heading title={`${mealId} Recipes`} />}
        <div className="flexAreaMeals">
          {mealArray.map((meal: IAreaMeal) => (
            <RecipeAlbum
              key={meal.idMeal}
              id={meal.idMeal}
              imageLink={meal.strMealThumb}
              recipeName={meal.strMeal}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Area;
