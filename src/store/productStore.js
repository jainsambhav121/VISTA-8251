import { create } from 'zustand';
import { productAPI } from '../services/api';
import toast from 'react-hot-toast';

export const useProductStore = create((set, get) => ({
  products: [],
  categories: [],
  currentProduct: null,
  isLoading: false,
  searchQuery: '',
  selectedCategory: '',
  sortBy: 'name',
  priceRange: [0, 1000],

  fetchProducts: async (params = {}) => {
    set({ isLoading: true });
    try {
      const response = await productAPI.getProducts(params);
      set({ products: response.data.products, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      toast.error('Failed to fetch products');
    }
  },

  fetchProductById: async (id) => {
    set({ isLoading: true });
    try {
      const response = await productAPI.getProductById(id);
      set({ currentProduct: response.data.product, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      toast.error('Failed to fetch product details');
    }
  },

  fetchCategories: async () => {
    try {
      const response = await productAPI.getCategories();
      set({ categories: response.data.categories });
    } catch (error) {
      toast.error('Failed to fetch categories');
    }
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query });
  },

  setSelectedCategory: (category) => {
    set({ selectedCategory: category });
  },

  setSortBy: (sortBy) => {
    set({ sortBy });
  },

  setPriceRange: (range) => {
    set({ priceRange: range });
  },

  filteredProducts: () => {
    const { products, searchQuery, selectedCategory, sortBy, priceRange } = get();
    
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  },
}));