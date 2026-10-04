import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../api/graphql";

function ProductCreate() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      setLoading(true);

      const payload = {
        ...form,
        price: parseFloat(form.price),
      };

      const product = await createProduct(payload);

      console.log("Created Product:", product);

      navigate("/products");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Create Product</h1>

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

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Create Product"}
        </button>
      </form>
    </div>
  );
}

export default ProductCreate;
