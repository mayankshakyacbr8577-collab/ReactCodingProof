import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Tool.css";
const Tools = () => {
const navigate = useNavigate();
  // Search
  const [search, setSearch] = useState("");

  // Real Time
  const [time, setTime] = useState(new Date());
  const handleLogout = () => {
  navigate("/login");
};
  // Products
  const products = [
    "Laptop",
    "Mobile",
    "Headphones",
    "Keyboard", 
    "Mouse",
    "Monitor"
  ];

  // Real-time clock
  useEffect(() => {

    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);

  }, []);

  // Search filter
  const filteredProducts = products.filter((product) =>
    product.toLowerCase().includes(search.toLowerCase())
  );

  return (
    className="tools-page">

      <div className="tools-page">

  <div className="tools-header">

    <h1>My Tools</h1>

    <button onClick={handleLogout}>
      Logout
    </button>

  </div>

  {/* Search Section */}

      <div className="search-section">

        <h2>🔍 Search Product</h2>

        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>


      {/* Search Results */}
      <div className="results">

        <h2>Search Results</h2>

        {search === "" ? (

          <p>Type something to search...</p>

        ) : filteredProducts.length > 0 ? (

          filteredProducts.map((product, index) => (
            <div className="result-item" key={index}>
              {product}
            </div>
          ))

        ) : (

          <p>No product found</p>

        )}

      </div>


      {/* Real Time Clock */}
      <div className="clock-section">

        <h2>🕐 Real Time</h2>

        <div className="clock-time">
          {time.toLocaleTimeString()}
        </div>

        <p>
          {time.toLocaleDateString()}
        </p>

      </div>

    </div>
  );
};

export default Tools;