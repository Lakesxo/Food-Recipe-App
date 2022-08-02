import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Heading from "../components/Heading/Heading";
import IngredientsList from "../components/IngredientsList/IngredientsList";
import { Link } from "react-router-dom";
import { Alert } from "antd";

interface RecipeProps {}

interface IRecipe {
  idMeal: string;
  strMealThumb: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strTags: string;
  strInstructions: string;
}

const Recipe: React.FunctionComponent<RecipeProps> = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [recipeDetails, setRecipeDetails] = useState<IRecipe>();
  const mealId = window.location.pathname.split("/")[2];
  const [comment, setComment] = useState<string>("");
  const [commentArray, setCommentArray] = useState<
    { id: string; comment: string }[]
  >([]);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [IngredientsAndMeasure, setIngredientsAndMeasure] = useState<
    { ingredient: string; measure: string }[]
  >([]);
  const persistentFavoriteArray = localStorage.getItem("favoriteMeals");
  const persistentCommentsArray = localStorage.getItem("recipe-comments");

  useEffect(() => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then((res) => {
        setRecipeDetails(res.data.meals[0]);
      })
      .catch((err) => setErrorMessage(err.message));
  }, [mealId]);

  useEffect(() => {
    if (recipeDetails) {
      const ingredientsArray: { ingredient: string }[] = [];
      const measureArray: { measure: string }[] = [];
      const finalArray: { ingredient: string; measure: string }[] = [];

      Object.entries(recipeDetails).filter((key: [string, string]) => {
        if (key[0].includes("strIngredient") && key[1] !== "") {
          ingredientsArray.push({ ingredient: key[1] });
        }
        if (key[0].includes("strMeasure") && key[1] !== "") {
          measureArray.push({ measure: key[1] });
        }
        return key;
      });

      ingredientsArray.map((item: { ingredient: string }, index: number) =>
        finalArray.push(Object.assign(item, measureArray[index]))
      );

      setIngredientsAndMeasure(finalArray);
    }
  }, [recipeDetails]);

  useEffect(() => {
    if (persistentFavoriteArray) {
      JSON.parse(persistentFavoriteArray).filter(
        (recipe: IRecipe) => recipe.idMeal === mealId && setIsFavorite(true)
      );
    }
  }, [persistentFavoriteArray, mealId]);

  const addComment = () => {
    if (persistentCommentsArray) {
      const lsComments = JSON.parse(persistentCommentsArray);
      setCommentArray([...lsComments, { id: mealId, comment: comment }]);
      localStorage.setItem(
        "recipe-comments",
        JSON.stringify([...lsComments, { id: mealId, comment: comment }])
      );
      setComment("");
    } else {
      setCommentArray([...commentArray, { id: mealId, comment: comment }]);
      localStorage.setItem(
        "recipe-comments",
        JSON.stringify([...commentArray, { id: mealId, comment: comment }])
      );
      setComment("");
    }
  };

  const addToFavorites = () => {
    if (persistentFavoriteArray) {
      const favoritesArray: IRecipe[] = JSON.parse(persistentFavoriteArray);
      if (
        recipeDetails &&
        favoritesArray.every(
          (meal: IRecipe) => meal.idMeal !== recipeDetails.idMeal
        )
      ) {
        favoritesArray.push(recipeDetails);
        localStorage.setItem("favoriteMeals", JSON.stringify(favoritesArray));
        setIsFavorite(true);
      }
    } else {
      const favoritesArray: IRecipe[] = [];
      if (recipeDetails) {
        favoritesArray.push(recipeDetails);
        localStorage.setItem("favoriteMeals", JSON.stringify(favoritesArray));
        setIsFavorite(true);
      }
    }
  };

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
      {recipeDetails && (
        <div className="recipeWrapper">
          <Heading title={recipeDetails.strMeal} />
          <div className="flexRecPicIng">
            <div className="leftReci">
              <img
                src={recipeDetails.strMealThumb}
                alt="recipe"
                className="recipeImage"
              />
              <button onClick={addToFavorites} className="blue mgTop20 fav">
                <span className="btnTxt">
                  {isFavorite ? "Added" : "Add"} to favorites
                </span>
                {isFavorite && (
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 50 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M34.2812 15.5313C34.7214 15.1122 35.3072 14.8805 35.915 14.8851C36.5228 14.8897 37.105 15.1302 37.5388 15.5559C37.9727 15.9816 38.2241 16.5592 38.2402 17.1668C38.2563 17.7744 38.0357 18.3645 37.6249 18.8125L25.1562 34.4063C24.9418 34.6372 24.683 34.8225 24.3954 34.9512C24.1077 35.0798 23.797 35.1491 23.482 35.1549C23.1669 35.1608 22.8539 35.103 22.5617 34.9851C22.2695 34.8672 22.004 34.6916 21.7812 34.4688L13.5124 26.2C13.2822 25.9854 13.0975 25.7267 12.9694 25.4392C12.8413 25.1517 12.7724 24.8413 12.7668 24.5267C12.7613 24.212 12.8192 23.8994 12.9371 23.6075C13.0549 23.3157 13.2304 23.0506 13.4529 22.828C13.6755 22.6055 13.9406 22.43 14.2325 22.3121C14.5243 22.1943 14.8369 22.1364 15.1516 22.1419C15.4663 22.1475 15.7766 22.2164 16.0641 22.3445C16.3516 22.4726 16.6104 22.6572 16.8249 22.8875L23.3687 29.4281L34.2218 15.6C34.2414 15.576 34.2622 15.553 34.2843 15.5313H34.2812Z"
                      fill="white"
                    />
                  </svg>
                )}
              </button>
            </div>
            <div className="rightReci">
              <h3>Ingredients & Measurements</h3>
              {IngredientsAndMeasure.map(
                (
                  item: { ingredient: string; measure: string },
                  index: number
                ) => (
                  <IngredientsList
                    key={index}
                    ingredient={item.ingredient}
                    measurement={item.measure}
                  />
                )
              )}

              <h3 className="mgTop20">Tags :</h3>
              <div className="flextags">
                {recipeDetails.strTags ? (
                  recipeDetails.strTags
                    .split(",")
                    .map((tag: string) => <span key={tag}>{tag}</span>)
                ) : (
                  <>No tags</>
                )}
              </div>
            </div>
          </div>
          <h3 className="mgTop20">Instructions :</h3>
          {recipeDetails.strInstructions
            .split(".")
            .map((item: string, index: number) => (
              <li className="instrc" key={index}>
                {item}
              </li>
            ))}
          <div className="flxCatrea">
            <div className="lftCt">
              <h3>Category</h3>
              <p className="bl">
                <Link to={`/category/${recipeDetails.strCategory}`}>
                  {recipeDetails.strCategory}
                </Link>
              </p>
            </div>
            <div className="lftCt">
              <h3>Area</h3>
              <p className="bl">
                <Link to={`/area/${recipeDetails.strArea}`}>
                  {recipeDetails.strArea}
                </Link>
              </p>
            </div>
          </div>
          <h3 className="mgTop20">Add comment</h3>
          <textarea
            onChange={(e) => setComment(e.target.value)}
            name=""
            id=""
            cols={30}
            rows={5}
            value={comment}
          ></textarea>
          <button onClick={addComment} className="blue mgTop20">
            Post
          </button>
          <h3 className="mgTop20">Comments :</h3>
          {persistentCommentsArray &&
            JSON.parse(persistentCommentsArray).map(
              (comment: { id: string; comment: string }, index: number) =>
                comment.id === mealId && <li key={index}>{comment.comment}</li>
            )}
        </div>
      )}
    </div>
  );
};

export default Recipe;
