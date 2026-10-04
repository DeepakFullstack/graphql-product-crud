import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getProduct, updateProduct } from "../api/graphql";

function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    id: "",
    name: "",
    price: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);

        const product = await getProduct(id);

        if (!product) {
          setError("Product not found");
          return;
        }
        const product_details = product.data.product;

        setForm({
          id: product_details.id,
          name: product_details.name,
          price: product_details.price,
          description: product_details.description || "",
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    try {
      setSaving(true);

      const payload = {
        ...form,
        price: parseFloat(form.price),
      };

      const updatedProduct = await updateProduct(payload);

      console.log("Updated:", updatedProduct);

      navigate("/products");
    } catch (error) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <h3>Loading product...</h3>;
  }

  if (error) {
    return (
      <div>
        <p style={{ color: "red" }}>{error}</p>

        <button onClick={() => navigate("/products")}>Back</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Product Details</h1>

      <p>
        <strong>Product ID:</strong> {form.id}
      </p>

      <hr />

      <h2>Update Product</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name</label>
          <br />

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <div>
          <label>Price</label>
          <br />

          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <div>
          <label>Description</label>
          <br />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>
        <br />
        <button type="submit" disabled={saving}>
          {saving ? "Updating..." : "Update Product"}
        </button>{" "}
        <button type="button" onClick={() => navigate("/products")}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default ProductEdit;
