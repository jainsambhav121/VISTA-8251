import axios from 'axios';

// Mock API base URL - replace with your actual backend URL
const API_BASE_URL = 'https://api.vista-store.com/api/v1';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('vista-auth')
      ? JSON.parse(localStorage.getItem('vista-auth')).state.token
      : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('vista-auth');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Mock data for pillow and mattress products
const mockProducts = [
  {
    id: 1,
    name: 'Fiber Pillow',
    description: 'Premium quality fiber pillow for comfortable sleep. Soft, breathable, and hypoallergenic.',
    price: 24.99,
    category: 'Pillows',
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=500&h=500&fit=crop',
    rating: 4.8,
    stock: 45,
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 2,
    name: 'Quilted Pillows',
    description: 'Luxurious quilted pillows with diamond pattern stitching for enhanced comfort and durability.',
    price: 34.99,
    category: 'Pillows',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500&h=500&fit=crop',
    rating: 4.7,
    stock: 32,
    createdAt: '2024-01-14T10:00:00Z'
  },
  {
    id: 3,
    name: 'Fiber Cushions',
    description: 'Comfortable fiber cushions perfect for chairs and sofas. Available in multiple sizes.',
    price: 18.99,
    category: 'Cushions',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop',
    rating: 4.5,
    stock: 60,
    createdAt: '2024-01-13T10:00:00Z'
  },
  {
    id: 4,
    name: 'Fiber Booster Pillows',
    description: 'Extra firm fiber booster pillows for enhanced neck and head support during sleep.',
    price: 29.99,
    category: 'Pillows',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&h=500&fit=crop',
    rating: 4.6,
    stock: 28,
    createdAt: '2024-01-12T10:00:00Z'
  },
  {
    id: 5,
    name: 'Memory Foam Pillows',
    description: 'Contour memory foam pillows that adapt to your head and neck shape for optimal comfort.',
    price: 49.99,
    category: 'Pillows',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=500&h=500&fit=crop',
    rating: 4.9,
    stock: 25,
    createdAt: '2024-01-11T10:00:00Z'
  },
  {
    id: 6,
    name: 'Single Sheet Foam Pillows',
    description: 'Lightweight single sheet foam pillows, perfect for travel and everyday use.',
    price: 19.99,
    category: 'Pillows',
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500&h=500&fit=crop',
    rating: 4.4,
    stock: 50,
    createdAt: '2024-01-10T10:00:00Z'
  },
  {
    id: 7,
    name: 'Single Bed PUF Mattress',
    description: 'High-quality PUF mattress for single beds. Provides excellent support and comfort.',
    price: 149.99,
    category: 'Mattresses',
    image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=500&h=500&fit=crop',
    rating: 4.7,
    stock: 15,
    createdAt: '2024-01-09T10:00:00Z'
  },
  {
    id: 8,
    name: 'Double Bed Mattresses',
    description: 'Premium double bed mattresses with superior comfort and long-lasting durability.',
    price: 299.99,
    category: 'Mattresses',
    image: 'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=500&h=500&fit=crop',
    rating: 4.8,
    stock: 12,
    createdAt: '2024-01-08T10:00:00Z'
  },
  {
    id: 9,
    name: 'PUF Sofa-Cum-Bed Mattresses',
    description: 'Versatile sofa-cum-bed mattresses perfect for multi-functional living spaces.',
    price: 199.99,
    category: 'Mattresses',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop',
    rating: 4.6,
    stock: 18,
    createdAt: '2024-01-07T10:00:00Z'
  },
  {
    id: 10,
    name: 'PUF SOFA Sheet',
    description: 'Protective and comfortable PUF sofa sheets available in various colors and sizes.',
    price: 39.99,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&h=500&fit=crop',
    rating: 4.5,
    stock: 35,
    createdAt: '2024-01-06T10:00:00Z'
  },
  {
    id: 11,
    name: 'Mattresses Chain Cover For All Sizes',
    description: 'Universal mattress chain covers that fit all sizes. Waterproof and easy to clean.',
    price: 24.99,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500&h=500&fit=crop',
    rating: 4.3,
    stock: 40,
    createdAt: '2024-01-05T10:00:00Z'
  }
];

const mockCategories = [
  { id: 1, name: 'Pillows', count: 6 },
  { id: 2, name: 'Mattresses', count: 3 },
  { id: 3, name: 'Cushions', count: 1 },
  { id: 4, name: 'Accessories', count: 2 }
];

// Mock API functions
export const authAPI = {
  login: (email, password) =>
    new Promise((resolve) => {
      setTimeout(() => {
        if (email === 'admin@vista.com' && password === 'admin123') {
          resolve({
            data: {
              user: {
                id: 1,
                name: 'Admin User',
                email: 'admin@vista.com',
                role: 'admin',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
              },
              token: 'mock-admin-token'
            }
          });
        } else if (email === 'user@vista.com' && password === 'user123') {
          resolve({
            data: {
              user: {
                id: 2,
                name: 'John Doe',
                email: 'user@vista.com',
                role: 'user',
                avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face'
              },
              token: 'mock-user-token'
            }
          });
        } else {
          throw new Error('Invalid credentials');
        }
      }, 1000);
    }),

  register: (userData) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            user: {
              id: Date.now(),
              ...userData,
              role: 'user',
              avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face'
            },
            token: 'mock-new-user-token'
          }
        });
      }, 1000);
    }),

  forgotPassword: (email) =>
    new Promise((resolve) => {
      setTimeout(() => resolve({ data: { message: 'Reset link sent' } }), 1000);
    }),

  verifyToken: (token) =>
    new Promise((resolve) => {
      setTimeout(() => {
        if (token === 'mock-admin-token') {
          resolve({
            data: {
              user: {
                id: 1,
                name: 'Admin User',
                email: 'admin@vista.com',
                role: 'admin',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
              }
            }
          });
        } else if (token === 'mock-user-token') {
          resolve({
            data: {
              user: {
                id: 2,
                name: 'John Doe',
                email: 'user@vista.com',
                role: 'user',
                avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face'
              }
            }
          });
        } else {
          throw new Error('Invalid token');
        }
      }, 500);
    }),

  updateProfile: (userData) =>
    new Promise((resolve) => {
      setTimeout(() => resolve({ data: { user: userData } }), 1000);
    }),
};

export const productAPI = {
  getProducts: (params) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { products: mockProducts } });
      }, 500);
    }),

  getProductById: (id) =>
    new Promise((resolve) => {
      setTimeout(() => {
        const product = mockProducts.find(p => p.id === parseInt(id));
        resolve({ data: { product } });
      }, 500);
    }),

  getCategories: () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { categories: mockCategories } });
      }, 300);
    }),
};

export const orderAPI = {
  createOrder: (orderData) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            order: {
              id: Date.now(),
              ...orderData,
              status: 'pending',
              createdAt: new Date().toISOString()
            }
          }
        });
      }, 1000);
    }),

  getOrders: (userId) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            orders: [
              {
                id: 1,
                total: 149.97,
                status: 'delivered',
                createdAt: '2024-01-20T10:00:00Z',
                items: [
                  { ...mockProducts[0], quantity: 2 },
                  { ...mockProducts[4], quantity: 1 }
                ]
              }
            ]
          }
        });
      }, 500);
    }),

  trackOrder: (orderId) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            tracking: {
              orderId,
              status: 'in_transit',
              updates: [
                {
                  status: 'confirmed',
                  date: '2024-01-20T10:00:00Z',
                  message: 'Order confirmed'
                },
                {
                  status: 'processing',
                  date: '2024-01-20T14:00:00Z',
                  message: 'Order is being processed'
                },
                {
                  status: 'shipped',
                  date: '2024-01-21T09:00:00Z',
                  message: 'Order has been shipped'
                },
                {
                  status: 'in_transit',
                  date: '2024-01-21T15:00:00Z',
                  message: 'Package is in transit'
                }
              ]
            }
          }
        });
      }, 500);
    }),
};

export default api;