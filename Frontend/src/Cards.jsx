import React, { useState, useEffect } from 'react';

const Cards = () => {
  const products = [
    {
      id: 1,
      name: "Noise Cancelling Headphones",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80",
      price: 129.99,
      originalPrice: 199.99,
      tag: "BESTSELLER"
    },
    {
      id: 2,
      name: "Smart Watch Pro",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=300&q=80",
      price: 179.99,
      originalPrice: 249.99,
      tag: "NEW"
    },
    {
      id: 3,
      name: "Wireless Earbuds",
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=300&q=80",
      price: 79.99,
      originalPrice: 99.99,
      tag: "LIMITED"
    },
    {
      id: 4,
      name: "Bluetooth Speaker",
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=300&q=80",
      price: 59.99,
      originalPrice: 89.99,
      tag: "SALE"
    },
    {
      id: 5,
      name: "4K Action Camera",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=300&q=80",
      price: 149.99,
      originalPrice: 199.99,
      tag: "HOT"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % products.length);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, products.length]);

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Featured Products
            </span>
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);
                setIsAutoPlaying(false);
              }}
              className="p-2 bg-white dark:bg-gray-800 rounded-full shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              ❮
            </button>
            <button
              onClick={() => {
                setCurrentSlide((prev) => (prev + 1) % products.length);
                setIsAutoPlaying(false);
              }}
              className="p-2 bg-white dark:bg-gray-800 rounded-full shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              ❯
            </button>
          </div>
        </div>

        {/* Product Cards Grid (3 per row on md+) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 transition-all duration-500 ease-in-out">
          {products.slice(currentSlide, currentSlide + 3).map((product) => (
            <div key={product.id} className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-transform hover:scale-[1.02]">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-56 object-contain p-4 hover:scale-105 transition duration-300 ease-in-out"
                />
                {product.tag && (
                  <span className={`absolute top-3 right-3 text-xs font-bold px-2 py-1 rounded-full ${
                    product.tag === "BESTSELLER" ? "bg-purple-100 text-purple-800" :
                    product.tag === "NEW" ? "bg-blue-100 text-blue-800" :
                    product.tag === "LIMITED" ? "bg-red-100 text-red-800" :
                    "bg-orange-100 text-orange-800"
                  }`}>
                    {product.tag}
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{product.name}</h3>
                <div className="flex items-center mt-2">
                  <span className="text-orange-500 font-bold">${product.price}</span>
                  <span className="text-gray-400 text-sm line-through ml-2">${product.originalPrice}</span>
                </div>
                <button className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-medium transition">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {products.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentSlide(idx);
                setIsAutoPlaying(false);
              }}
              className={`w-3 h-3 rounded-full ${
                idx === currentSlide ? 'bg-orange-500 w-6' : 'bg-gray-400 dark:bg-gray-600'
              } transition-all duration-300`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cards;
