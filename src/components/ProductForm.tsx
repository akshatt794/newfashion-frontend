import React, { useState, useRef, ChangeEvent, FormEvent } from "react";
import customFetch from "../axios/custom";

interface ProductFormProps {
  onSuccess: () => void;
  editingProduct?: {
    _id: string;
    name: string;
    price: number;
    description: string;
    category: string;
    image: string;
  };
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  marginBottom: "12px",
  padding: "8px",
  border: "1px solid #ccc",
  borderRadius: "6px",
  fontSize: "1rem",
};
const buttonStyle: React.CSSProperties = {
  padding: "8px 22px",
  border: "none",
  borderRadius: "6px",
  background: "#222",
  color: "#fff",
  cursor: "pointer",
  fontWeight: 500,
};

const ProductForm: React.FC<ProductFormProps> = ({ onSuccess, editingProduct }) => {
  const [form, setForm] = useState({
    name: editingProduct?.name || "",
    price: editingProduct ? editingProduct.price.toString() : "",
    description: editingProduct?.description || "",
    category: editingProduct?.category || "",
  });
  const fileRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string>("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage("");
    const { name, price, description, category } = form;
    if (!name || !price) {
      setMessage("Name and price are required.");
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);

    if (fileRef.current?.files && fileRef.current.files[0]) {
      formData.append("image", fileRef.current.files[0]);
    } else if (!editingProduct) {
      setMessage("Please select a product image.");
      return;
    }

    try {
      if (editingProduct) {
        await customFetch.put(
          `/products/${editingProduct._id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setMessage("Product updated!");
      } else {
        await customFetch.post("/products", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setMessage("Product added!");
      }
      setForm({ name: "", price: "", description: "", category: "" });
      if (fileRef.current) fileRef.current.value = "";
      onSuccess();
    } catch (error: any) {
      setMessage(error.response?.data?.error || "Error saving product");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      <div>
        <label style={{ fontWeight: 500 }}>Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <label style={{ fontWeight: 500 }}>Price</label>
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <label style={{ fontWeight: 500 }}>Image</label>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          style={inputStyle}
        />
      </div>

      <div>
        <label style={{ fontWeight: 500 }}>Category</label>
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          style={inputStyle}
        />

        <label style={{ fontWeight: 500 }}>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          style={{ ...inputStyle, height: 70 }}
        />
      </div>

      <div style={{ gridColumn: "1/3" }}>
        <button type="submit" style={buttonStyle}>
          {editingProduct ? "Update" : "Add"} Product
        </button>
      </div>

      {message && (
        <p style={{ color: message.includes("Error") ? "red" : "green" }}>{message}</p>
      )}
    </form>
  );
};

export default ProductForm;
