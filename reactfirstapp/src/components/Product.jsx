import { useState, useEffect } from "react";
import axios from "axios";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ name: "", price: "" });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = "/products";

  // Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setProducts(response.data);
      setError("");
    } catch {
      setError("Failed to fetch products. Make sure the Node.js server is running on port 3000.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_URL);
        if (!isMounted) return;
        setProducts(response.data);
        setError("");
      } catch {
        if (!isMounted) return;
        setError("Failed to fetch products. Make sure the Node.js server is running on port 3000.");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  // Add new product
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      setError("Please fill in all fields");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(API_URL, {
        name: formData.name,
        price: parseFloat(formData.price)
      });
      setProducts([...products, response.data.product]);
      setFormData({ name: "", price: "" });
      setError("");
    } catch {
      setError("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  // Update product
  const handleUpdate = async (id) => {
    if (!formData.name || !formData.price) {
      setError("Please fill in all fields");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.put(`${API_URL}/${id}`, {
        name: formData.name,
        price: parseFloat(formData.price)
      });
      setProducts(products.map(p => p.id === id ? response.data.product : p));
      setFormData({ name: "", price: "" });
      setEditingId(null);
      setError("");
    } catch {
      setError("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }
    try {
      setLoading(true);
      await axios.delete(`${API_URL}/${id}`);
      setProducts(products.filter(p => p.id !== id));
      setError("");
    } catch {
      setError("Failed to delete product");
    } finally {
      setLoading(false);
    }
  };
    
  // Start editing
  const startEdit = (product) => {
    setEditingId(product.id);
    setFormData({ name: product.name, price: product.price });
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ name: "", price: "" });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Product Management - CRUD Operations</h2>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      {/* Add/Edit Form */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">{editingId ? "Edit Product" : "Add New Product"}</h5>
          <form onSubmit={editingId ? (e) => { e.preventDefault(); handleUpdate(editingId); } : handleAdd}>
            <div className="row">
              <div className="col-md-4 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Product Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="col-md-4 mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Price"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
              <div className="col-md-4 mb-3">
                {editingId ? (
                  <>
                    <button type="submit" className="btn btn-success me-2">
                      Update
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={cancelEdit}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <button type="submit" className="btn btn-primary">
                    Add Product
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Refresh Button */}
      <button className="btn btn-info mb-3" onClick={fetchProducts} disabled={loading}>
        {loading ? "Loading..." : "Refresh Products"}
      </button>

      {/* Products Table */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Products List</h5>
          {products.length === 0 ? (
            <p className="text-muted">No products available</p>
          ) : (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => startEdit(product)}
                        disabled={loading}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(product.id)}
                        disabled={loading}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
export default Product;
