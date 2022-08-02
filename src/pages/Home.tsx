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
  const [filterValue, setFilterValue] = useState("name");
  const [valueToFilter, setValueToFilter] = useState<string>("");
  const [recipeArray, setRecipeArray] = useState<IRecipe[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const searchRecipe = () => {
    axios
      .post(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`
      )
      .then((res) => {
        setRecipeArray(res.data.meals);
      })
      .catch((err) => setErrorMessage(err.message));
  };

  const filterByName = () => {
    const newArray: IRecipe[] = [];
    recipeArray.filter(
      (meal: IRecipe) =>
        meal.strMeal.toLowerCase().includes(valueToFilter.toLowerCase()) &&
        newArray.push(meal)
    );
    setRecipeArray(newArray);
  };

  const filterByCategory = () => {
    const newArray: IRecipe[] = [];
    recipeArray.filter(
      (meal: IRecipe) =>
        meal.strCategory.toLowerCase().includes(valueToFilter.toLowerCase()) &&
        newArray.push(meal)
    );
    setRecipeArray(newArray);
  };

  const filterByArea = () => {
    const newArray: IRecipe[] = [];
    recipeArray.filter(
      (meal: IRecipe) =>
        meal.strArea.toLowerCase().includes(valueToFilter.toLowerCase()) &&
        newArray.push(meal)
    );
    setRecipeArray(newArray);
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
            <div className="filter">
              <h3>Filter</h3>
              <div className="flxFilter">
                <select
                  name="filer"
                  id="filter"
                  onChange={(e) => setFilterValue(e.target.value)}
                >
                  <option value="name">Name</option>
                  <option value="category">Category</option>
                  <option value="area">Area</option>
                </select>
                <input
                  type="text"
                  className="filterValue"
                  onChange={(e) => setValueToFilter(e.target.value)}
                  placeholder="Enter text"
                />
              </div>
              <button
                onClick={
                  filterValue === "name"
                    ? filterByName
                    : filterValue === "category"
                    ? filterByCategory
                    : filterValue === "area"
                    ? filterByArea
                    : filterByName
                }
                className="blue mgTop20"
              >
                Filter
              </button>
            </div>
            {recipeArray.length > 0 && (
              <>
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
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
