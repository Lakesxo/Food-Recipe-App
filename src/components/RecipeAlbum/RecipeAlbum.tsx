import { Link } from "react-router-dom";
import "./RecipeAlbum.scss";

interface RecipeAlbumProps {
  id: string;
  imageLink: string;
  recipeName: string;
  categoryName?: string;
  areaName?: string;
}

const RecipeAlbum: React.FunctionComponent<RecipeAlbumProps> = ({
  id,
  imageLink,
  recipeName,
  categoryName,
  areaName,
}) => {
  return (
    <div className="albumWrapper">
      <img className="recImg" src={imageLink} alt="recipe" />
      <div className="recipeDetails">
        <Link to={`/recipe/${id}`}>
          <p className="rTxt">
            {recipeName.length > 20
              ? `${recipeName.slice(0, 20)}...`
              : recipeName}
          </p>
        </Link>
        {categoryName && areaName && (
          <>
            <Link to={`/category/${categoryName}`}>
              <p className="rTxt">{categoryName}</p>
            </Link>
            <Link to={`/area/${areaName}`}>
              <p className="rTxt">{areaName}</p>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default RecipeAlbum;
