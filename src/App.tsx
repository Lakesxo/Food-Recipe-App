import { BrowserRouter, Routes, Route } from "react-router-dom";
import Area from "./pages/Area";
import Category from "./pages/Category";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import Recipe from "./pages/Recipe";

interface AppProps {}

const App: React.FunctionComponent<AppProps> = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="recipe/:id" element={<Recipe />} />
          <Route path="area/:areaName" element={<Area />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="category/:categoryName" element={<Category />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
