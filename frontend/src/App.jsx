import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import ProductList from "./components/ProductList";
import ProductCreate from "./components/ProductCreate";
import ProductEdit from "./components/ProductEdit";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/products">Products</Link>
        {" | "}
        <Link to="/products/create">Create Product</Link>
      </nav>
      <hr />
      <Routes>
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/create" element={<ProductCreate />} />
        <Route path="/products/:id" element={<ProductEdit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
