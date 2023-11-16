import Header from "../components/Header/Header";
import Heading from "../components/Heading/Heading";
import RandomRecipe from "../components/RandomRecipe/RandomRecipe";
import RecipeAlbum from "../components/RecipeAlbum/RecipeAlbum";
import axios from "axios";
import { useState } from "react";
import { Alert } from "antd";

interface HomeProps {}

interface IRecipe {
  idMeal: string;
  strMealThumb: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
}

const Home: React.FunctionComponent<HomeProps> = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [recipeArray, setRecipeArray] = useState<IRecipe[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isNoResult, setIsNoResult] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const searchRecipe = () => {
    setIsLoading(true);
    axios
      .post(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`
      )
      .then((res) => {
        if (res.data.meals) {
          setIsNoResult(false);
          setRecipeArray(res.data.meals);
          setIsLoading(false);
        } else {
          setIsNoResult(true);
          setIsLoading(false);
          setRecipeArray([]);
        }
      })
      .catch((err) => setErrorMessage(err.message));
  };

  return (
    <div>
      <Header />
      {errorMessage && (
        <Alert message={errorMessage} type="error" showIcon closable />
      )}
      <main>
        <section>
          <RandomRecipe setErrorMessage={setErrorMessage} />
          <div className="searchMeal">
            <Heading title="Search For A Recipe" />
            <div className="inpSearch">
              <input
                type="text"
                placeholder="Enter recipe name"
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && searchRecipe()}
              />
              <button onClick={searchRecipe} className="blue">
                Search
              </button>
            </div>
            {recipeArray.length > 0 && (
              <div className="results">
                <h3>Results :</h3>
                <div className="flexMeals">
                  {recipeArray.map((recipe: IRecipe) => (
                    <RecipeAlbum
                      key={recipe.idMeal}
                      id={recipe.idMeal}
                      imageLink={recipe.strMealThumb}
                      recipeName={recipe.strMeal}
                      categoryName={recipe.strCategory}
                      areaName={recipe.strArea}
                    />
                  ))}
                </div>
              </div>
            )}
            {isNoResult && !isLoading && (
              <div className="noResWrapper">
                <p className="noResult">No result</p>
              </div>
            )}
            {isLoading && (
              <div className="loadWrapper">
                <div className="loading"></div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
