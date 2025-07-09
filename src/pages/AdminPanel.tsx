import React, { useEffect, useRef, useState } from "react";
import customFetch from "../axios/custom";
import ProductForm from "../components/ProductForm";

// Types
type Product = {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
};
type Banner = {
  _id: string;
  image?: string;
  video?: string;
  title?: string;
  link?: string;
  type?: string; // "hero" or "carousel"
};
type Order = {
  _id: string;
  user: string;
  products: { productId: string; name: string; price: number; quantity: number }[];
  total: number;
  paymentStatus: string;
  createdAt: string;
};
type User = {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
};

const inputClass: React.CSSProperties = {
  width: "100%",
  marginBottom: "12px",
  padding: "8px",
  border: "1px solid #ccc",
  borderRadius: "6px",
  fontSize: "1rem",
};

const buttonClass: React.CSSProperties = {
  padding: "8px 22px",
  border: "none",
  borderRadius: "6px",
  background: "#222",
  color: "#fff",
  cursor: "pointer",
  fontWeight: 500,
  marginRight: "8px",
};

const cardClass: React.CSSProperties = {
  background: "#fff",
  boxShadow: "0 2px 8px #0001",
  borderRadius: "10px",
  padding: "28px 32px",
  marginBottom: "32px",
};

const AdminPanel: React.FC = () => {
  // PRODUCTS
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [message, setMessage] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await customFetch.get("/products");
      setProducts(res.data);
    } catch {
      setMessage("Error loading products.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await customFetch.delete(`/products/${id}`);
      setMessage("Product deleted!");
      fetchProducts();
    } catch {
      setMessage("Error deleting product");
    }
  };

  const onProductFormSuccess = () => {
    setEditingProduct(null);
    setMessage("");
    fetchProducts();
  };

  // BANNERS
  const [banners, setBanners] = useState<Banner[]>([]);
  // Two separate forms
  const [heroForm, setHeroForm] = useState({ title: "", link: "" });
  const [carouselForm, setCarouselForm] = useState({ title: "", link: "" });
  const [bannerMsg, setBannerMsg] = useState("");
  const heroFileRef = useRef<HTMLInputElement>(null);
  const carouselFileRef = useRef<HTMLInputElement>(null);

  const fetchBanners = async () => {
    try {
      const res = await customFetch.get("/banners");
      setBanners(res.data);
    } catch {
      setBannerMsg("Error loading banners.");
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // Hero Banner (video)
  const handleHeroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeroForm({ ...heroForm, [e.target.name]: e.target.value });
  };
  const handleHeroSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBannerMsg("");
    const formData = new FormData();
    if (heroFileRef.current?.files?.[0]) {
      formData.append("file", heroFileRef.current.files[0]);
    } else {
      setBannerMsg("Please select a video file.");
      return;
    }
    formData.append("title", heroForm.title);
    formData.append("link", heroForm.link);
    formData.append("type", "hero");
    try {
      await customFetch.post("/banners", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setBannerMsg("Hero Banner added!");
      setHeroForm({ title: "", link: "" });
      if (heroFileRef.current) heroFileRef.current.value = "";
      fetchBanners();
    } catch {
      setBannerMsg("Error adding hero banner");
    }
  };

  // Carousel Banners (images/videos)
  const handleCarouselChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCarouselForm({ ...carouselForm, [e.target.name]: e.target.value });
  };
  const handleCarouselSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBannerMsg("");
    const formData = new FormData();
    if (carouselFileRef.current?.files?.[0]) {
      formData.append("file", carouselFileRef.current.files[0]);
    } else {
      setBannerMsg("Please select an image/video file.");
      return;
    }
    formData.append("title", carouselForm.title);
    formData.append("link", carouselForm.link);
    formData.append("type", "carousel");
    try {
      await customFetch.post("/banners", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setBannerMsg("Carousel Banner added!");
      setCarouselForm({ title: "", link: "" });
      if (carouselFileRef.current) carouselFileRef.current.value = "";
      fetchBanners();
    } catch {
      setBannerMsg("Error adding carousel banner");
    }
  };

  // Delete Banner
  const handleDeleteBanner = async (id: string) => {
    if (!window.confirm("Delete this banner?")) return;
    try {
      await customFetch.delete(`/banners/${id}`);
      setBannerMsg("Banner deleted!");
      fetchBanners();
    } catch {
      setBannerMsg("Error deleting banner");
    }
  };

  // Separate hero and carousel banners
  const heroBanner = banners.find((b) => b.type === "hero" && b.video);
  const carouselBanners = banners.filter((b) => b.type === "carousel");

  // ORDERS
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderMsg, setOrderMsg] = useState("");

  const fetchOrders = async () => {
    try {
      const res = await customFetch.get("/orders");
      setOrders(res.data);
    } catch {
      setOrderMsg("Error loading orders.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // USERS
  const [users, setUsers] = useState<User[]>([]);
  const [userMsg, setUserMsg] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await customFetch.get("/users");
      setUsers(res.data);
    } catch {
      setUserMsg("Error loading users.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ maxWidth: 1050, margin: "40px auto", padding: 24 }}>
      {/* PRODUCT CARD */}
      <div style={cardClass}>
        <h2 style={{ marginBottom: 24 }}>
          {editingProduct ? "Edit Product" : "Add Product"}
        </h2>
        <ProductForm
          editingProduct={editingProduct ?? undefined}
          onSuccess={onProductFormSuccess}
        />
        {message && (
          <div style={{ marginTop: 10, color: message.includes("Error") ? "red" : "green" }}>
            {message}
          </div>
        )}
      </div>

      {/* PRODUCTS LIST */}
      <div style={cardClass}>
        <h3 style={{ marginBottom: 16 }}>All Products</h3>
        <div style={{ maxHeight: 230, overflowY: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#fafafa" }}>
                <th>Name</th>
                <th>Price</th>
                <th>Image</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length ? (
                products.map((p) => (
                  <tr key={p._id} style={{ borderTop: "1px solid #eee" }}>
                    <td>{p.name}</td>
                    <td>₹{p.price}</td>
                    <td>
                      {p.image && (
                        <img
                          src={`https://newfashion-backend.onrender.com${p.image}`}
                          alt={p.name}
                          style={{
                            width: 44,
                            height: 44,
                            objectFit: "cover",
                            borderRadius: 5,
                          }}
                        />
                      )}
                    </td>
                    <td>{p.category}</td>
                    <td>
                      <button
                        onClick={() => setEditingProduct(p)}
                        style={buttonClass}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(p._id)}
                        style={{ ...buttonClass, background: "#f44336" }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", color: "#888" }}>
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* HERO BANNER (VIDEO) */}
      <div style={cardClass}>
        <h2>Hero Banner Video (top of home page)</h2>
        <form
          onSubmit={handleHeroSubmit}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 14,
            marginBottom: 18,
          }}
        >
          <div>
            <label style={{ fontWeight: 500 }}>Banner Video</label>
            <input
              ref={heroFileRef}
              type="file"
              accept="video/*"
              style={inputClass}
              required
            />
          </div>
          <div>
            <label style={{ fontWeight: 500 }}>Banner Title (optional)</label>
            <input
              name="title"
              placeholder="Banner Title (optional)"
              value={heroForm.title}
              onChange={handleHeroChange}
              style={inputClass}
            />
          </div>
          <div>
            <label style={{ fontWeight: 500 }}>Link (optional)</label>
            <input
              name="link"
              placeholder="Link (optional)"
              value={heroForm.link}
              onChange={handleHeroChange}
              style={inputClass}
            />
          </div>
          <button type="submit" style={{ ...buttonClass, gridColumn: "1 / 4" }}>
            Add Hero Banner
          </button>
        </form>
        {heroBanner && (
          <video
            src={`https://newfashion-backend.onrender.com${heroBanner.video}`}
            controls
            style={{ width: "100%", maxWidth: 600, margin: "auto" }}
          />
        )}
      </div>

      {/* CAROUSEL BANNERS */}
      <div style={cardClass}>
        <h2>Banner Carousel (multiple images/videos below header)</h2>
        <form
          onSubmit={handleCarouselSubmit}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 14,
            marginBottom: 18,
          }}
        >
          <div>
            <label style={{ fontWeight: 500 }}>Image/Video</label>
            <input
              ref={carouselFileRef}
              type="file"
              accept="image/*,video/*"
              style={inputClass}
              required
            />
          </div>
          <div>
            <label style={{ fontWeight: 500 }}>Banner Title (optional)</label>
            <input
              name="title"
              placeholder="Banner Title (optional)"
              value={carouselForm.title}
              onChange={handleCarouselChange}
              style={inputClass}
            />
          </div>
          <div>
            <label style={{ fontWeight: 500 }}>Link (optional)</label>
            <input
              name="link"
              placeholder="Link (optional)"
              value={carouselForm.link}
              onChange={handleCarouselChange}
              style={inputClass}
            />
          </div>
          <button type="submit" style={{ ...buttonClass, gridColumn: "1 / 4" }}>
            Add Carousel Banner
          </button>
        </form>
        {/* Show carousel banners */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 18 }}>
          {carouselBanners.map((b) => (
            <div key={b._id} style={{ width: 160 }}>
              {b.image && (
                <img
                  src={`https://newfashion-backend.onrender.com${b.image}`}
                  style={{ width: "100%", borderRadius: 6, marginBottom: 6 }}
                  alt={b.title}
                />
              )}
              {b.video && (
                <video
                  src={`https://newfashion-backend.onrender.com${b.video}`}
                  controls
                  style={{ width: "100%", borderRadius: 6, marginBottom: 6 }}
                />
              )}
              <div style={{ fontSize: 13, color: "#666" }}>{b.title}</div>
              <button
                onClick={() => handleDeleteBanner(b._id)}
                style={{ ...buttonClass, background: "#f44336", marginTop: 4 }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ORDER SECTION */}
      <div style={cardClass}>
        <h2>All Orders</h2>
        {orderMsg && <div style={{ color: "red" }}>{orderMsg}</div>}
        <div style={{ maxHeight: 200, overflowY: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#fafafa" }}>
                <th>User</th>
                <th>Products</th>
                <th>Total</th>
                <th>Payment Status</th>
                <th>Ordered At</th>
              </tr>
            </thead>
            <tbody>
              {orders.length ? (
                orders.map((o) => (
                  <tr key={o._id} style={{ borderTop: "1px solid #eee" }}>
                    <td>{o.user}</td>
                    <td>
                      {o.products.map((p, idx) => (
                        <div key={idx}>
                          {p.name} (x{p.quantity})
                        </div>
                      ))}
                    </td>
                    <td>₹{o.total}</td>
                    <td>{o.paymentStatus}</td>
                    <td>{new Date(o.createdAt).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", color: "#888" }}>
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* USERS CARD */}
      <div style={cardClass}>
        <h2>All Registered Users</h2>
        {userMsg && <div style={{ color: "red" }}>{userMsg}</div>}
        <div style={{ maxHeight: 180, overflowY: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#fafafa" }}>
                <th>Name</th>
                <th>Email</th>
                <th>Registered At</th>
              </tr>
            </thead>
            <tbody>
              {users.length ? (
                users.map((u) => (
                  <tr key={u._id} style={{ borderTop: "1px solid #eee" }}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{new Date(u.createdAt).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} style={{ textAlign: "center", color: "#888" }}>
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
