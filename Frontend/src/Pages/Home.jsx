import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token");
        if (!token) {
          setError("No authentication token found. Please login again.");
          setLoading(false);
          return;
        }

        const res = await fetch("https://auth-backend-api-xq05.onrender.com/auth/product", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }

        const data = await res.json();
        setProducts(data);
      } catch (error) {
        setError(error.message || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Welcome to Home</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md transition"
          aria-label="Logout"
        >
          Logout
        </button>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Products from API
        </h2>

        {loading && <p className="text-gray-500">Loading products...</p>}

        {error && (
          <p className="text-red-600 font-semibold mb-4">
            Error: {error}
          </p>
        )}

        {!loading && !error && products.length === 0 && (
          <p className="text-gray-600">No products available.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {products.map(({ name, price }, index) => (
            <div
              key={index}
              className="border rounded-md p-4 shadow hover:shadow-lg transition bg-white"
            >
              <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
              <p className="text-purple-700 font-bold">Rs {price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
