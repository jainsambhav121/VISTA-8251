import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../components/common/SafeIcon';
import { useProductStore } from '../store/productStore';

const { FiGrid, FiArrowRight, FiPackage } = FiIcons;

const Categories = () => {
  const { categories, fetchCategories } = useProductStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const categoryImages = {
    'Pillows': 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=500&h=300&fit=crop',
    'Mattresses': 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=500&h=300&fit=crop',
    'Cushions': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=300&fit=crop',
    'Accessories': 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&h=300&fit=crop'
  };

  const categoryDescriptions = {
    'Pillows': 'Comfortable pillows for perfect sleep',
    'Mattresses': 'Premium mattresses for ultimate comfort',
    'Cushions': 'Soft cushions for your furniture',
    'Accessories': 'Essential bedding accessories'
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <SafeIcon icon={FiGrid} className="w-16 h-16 mx-auto mb-6 text-white" />
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Shop by Categories
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Explore our wide range of premium pillow and mattress categories for the perfect sleep experience
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-black mb-4">Browse Categories</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our carefully curated collection of sleep essentials organized by category
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group"
              >
                <Link to={`/products?category=${category.name.toLowerCase()}`}>
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200">
                    <div className="relative overflow-hidden">
                      <img
                        src={categoryImages[category.name] || 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=500&h=300&fit=crop'}
                        alt={category.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 filter grayscale hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-300"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <SafeIcon icon={FiPackage} className="w-6 h-6 mb-2" />
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-black mb-2 group-hover:text-gray-700 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 mb-3 text-sm">
                        {categoryDescriptions[category.name]}
                      </p>
                      <p className="text-gray-500 mb-4 text-sm">
                        {category.count} products available
                      </p>
                      
                      <div className="flex items-center text-black group-hover:text-gray-700 transition-colors">
                        <span className="font-medium">Shop Now</span>
                        <SafeIcon icon={FiArrowRight} className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Featured Categories */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 bg-white rounded-2xl shadow-lg p-8 border border-gray-200"
          >
            <h3 className="text-2xl font-bold text-black mb-6 text-center">
              Popular This Week
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center p-6 border border-gray-200 rounded-lg hover:border-black transition-colors">
                <div className="bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SafeIcon icon={FiPackage} className="w-6 h-6 text-black" />
                </div>
                <h4 className="font-semibold text-black mb-2">Memory Foam Collection</h4>
                <p className="text-gray-600 text-sm">Premium memory foam pillows and mattresses</p>
              </div>
              
              <div className="text-center p-6 border border-gray-200 rounded-lg hover:border-black transition-colors">
                <div className="bg-black w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SafeIcon icon={FiPackage} className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-black mb-2">PUF Mattress Range</h4>
                <p className="text-gray-600 text-sm">Comfortable and durable PUF mattresses</p>
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-center mt-16"
          >
            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors inline-flex items-center text-lg"
              >
                View All Products
                <SafeIcon icon={FiArrowRight} className="ml-2 w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Categories;