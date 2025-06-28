import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../components/common/SafeIcon';
import { orderAPI } from '../../services/api';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const { FiArrowLeft, FiPackage, FiTruck, FiCheck, FiClock } = FiIcons;

const OrderTracking = () => {
  const { id } = useParams();
  const [tracking, setTracking] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTracking = async () => {
      try {
        const response = await orderAPI.trackOrder(id);
        setTracking(response.data.tracking);
      } catch (error) {
        console.error('Failed to fetch tracking:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTracking();
  }, [id]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return FiCheck;
      case 'processing':
        return FiPackage;
      case 'shipped':
        return FiTruck;
      case 'in_transit':
        return FiTruck;
      case 'delivered':
        return FiCheck;
      default:
        return FiClock;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xlarge" />
      </div>
    );
  }

  if (!tracking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Order not found</h2>
          <Link to="/orders">
            <button className="text-primary-600 hover:text-primary-700">
              Back to orders
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/orders"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4"
          >
            <SafeIcon icon={FiArrowLeft} className="w-4 h-4 mr-2" />
            Back to Orders
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            Order #{tracking.orderId} Tracking
          </h1>
          <p className="mt-2 text-gray-600">
            Track your order status and delivery progress
          </p>
        </div>

        {/* Current Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm p-6 mb-8"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-primary-100 p-3 rounded-full">
              <SafeIcon 
                icon={getStatusIcon(tracking.status)} 
                className="w-8 h-8 text-primary-600" 
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {tracking.status === 'in_transit' ? 'In Transit' : 
                 tracking.status.charAt(0).toUpperCase() + tracking.status.slice(1)}
              </h2>
              <p className="text-gray-600">
                Your order is currently {tracking.status === 'in_transit' ? 'on the way' : tracking.status}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Tracking Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <h3 className="text-lg font-medium text-gray-900 mb-6">Tracking History</h3>
          
          <div className="space-y-6">
            {tracking.updates.map((update, index) => (
              <div key={index} className="relative">
                {index !== tracking.updates.length - 1 && (
                  <div className="absolute left-4 top-8 w-px h-16 bg-gray-200"></div>
                )}
                
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-2 rounded-full">
                    <SafeIcon 
                      icon={getStatusIcon(update.status)} 
                      className="w-4 h-4 text-primary-600" 
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">
                        {update.message}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(update.date).toLocaleDateString()} at{' '}
                        {new Date(update.date).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 capitalize">
                      Status: {update.status.replace('_', ' ')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Estimated Delivery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-6"
        >
          <div className="flex items-center space-x-4">
            <SafeIcon icon={FiTruck} className="w-8 h-8 text-primary-600" />
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Estimated Delivery
              </h3>
              <p className="text-gray-600">
                {tracking.status === 'delivered' 
                  ? 'Your order has been delivered!'
                  : 'Expected delivery: 2-3 business days'
                }
              </p>
            </div>
          </div>
        </motion.div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-600 mb-4">
            Have questions about your order?
          </p>
          <button className="text-primary-600 hover:text-primary-700 font-medium">
            Contact Customer Support
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderTracking;