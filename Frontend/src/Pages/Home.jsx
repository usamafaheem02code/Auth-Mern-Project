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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-10">
        <h1 className="text-4xl font-extrabold text-purple-700 mb-4 sm:mb-0">
          Welcome to Home
        </h1>
        <button
          onClick={handleLogout}
          className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md transition-shadow shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          aria-label="Logout"
        >
          Logout
        </button>
      </header>

      <section>
        <h2 className="text-2xl font-semibold mb-6 text-gray-700 border-b border-purple-300 pb-2">
          Products from API
        </h2>

        {loading && (
          <p className="text-gray-500 italic">Loading products...</p>
        )}

        {error && (
          <p className="text-red-600 font-semibold mb-4">{error}</p>
        )}

        {!loading && !error && products.length === 0 && (
          <p className="text-gray-600 italic">No products available.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(({ name, price }, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow cursor-pointer"
              role="article"
              tabIndex={0}
              aria-label={`Product ${name} priced at Rs ${price}`}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{name}</h3>
              <p className="text-purple-700 font-bold text-lg">Rs {price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
