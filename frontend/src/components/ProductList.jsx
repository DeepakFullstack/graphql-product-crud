import { useEffect, useState } from "react";
import { getProducts } from "../api/graphql";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      setLoading(true);
      const response = await getProducts();
      if (response.errors) {
        throw new Error(response.errors[0].message);
      }
      setProducts(response.data.products);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <h3>Loading products...</h3>;
  }

  if (error) {
    return <h3>Error: {error}</h3>;
  }

  return (
    <div>
      <h2>Products</h2>
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>Price: ₹{product.price}</p>
          <p>{product.description}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default ProductList;
