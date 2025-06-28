import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../components/common/SafeIcon';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import toast from 'react-hot-toast';

const { FiCreditCard, FiLock, FiMapPin, FiUser, FiMail, FiPhone } = FiIcons;

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { items, total, clearCart } = useCartStore();
  const { user } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: user?.email || '',
      firstName: user?.name?.split(' ')[0] || '',
      lastName: user?.name?.split(' ')[1] || '',
    }
  });

  const subtotal = total;
  const shipping = total > 50 ? 0 : 9.99;
  const tax = total * 0.08;
  const grandTotal = subtotal + shipping + tax;

  const onSubmit = async (data) => {
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear cart and show success
      clearCart();
      toast.success('Order placed successfully!');
      
      // Redirect or show success page
      console.log('Order data:', { ...data, items, total: grandTotal });
      
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <h2 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
                  <SafeIcon icon={FiUser} className="w-5 h-5 mr-2" />
                  Contact Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Email Address"
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    error={errors.email?.message}
                  />
                  
                  <Input
                    label="Phone Number"
                    type="tel"
                    {...register('phone', {
                      required: 'Phone number is required'
                    })}
                    error={errors.phone?.message}
                  />
                </div>
              </motion.div>

              {/* Shipping Address */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <h2 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
                  <SafeIcon icon={FiMapPin} className="w-5 h-5 mr-2" />
                  Shipping Address
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="First Name"
                    {...register('firstName', {
                      required: 'First name is required'
                    })}
                    error={errors.firstName?.message}
                  />
                  
                  <Input
                    label="Last Name"
                    {...register('lastName', {
                      required: 'Last name is required'
                    })}
                    error={errors.lastName?.message}
                  />
                  
                  <div className="md:col-span-2">
                    <Input
                      label="Address"
                      {...register('address', {
                        required: 'Address is required'
                      })}
                      error={errors.address?.message}
                    />
                  </div>
                  
                  <Input
                    label="City"
                    {...register('city', {
                      required: 'City is required'
                    })}
                    error={errors.city?.message}
                  />
                  
                  <Input
                    label="State"
                    {...register('state', {
                      required: 'State is required'
                    })}
                    error={errors.state?.message}
                  />
                  
                  <Input
                    label="ZIP Code"
                    {...register('zipCode', {
                      required: 'ZIP code is required'
                    })}
                    error={errors.zipCode?.message}
                  />
                  
                  <Input
                    label="Country"
                    {...register('country', {
                      required: 'Country is required'
                    })}
                    error={errors.country?.message}
                  />
                </div>
              </motion.div>

              {/* Payment Method */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <h2 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
                  <SafeIcon icon={FiCreditCard} className="w-5 h-5 mr-2" />
                  Payment Method
                </h2>
                
                <div className="space-y-4 mb-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      Credit/Debit Card
                    </span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      PayPal
                    </span>
                  </label>
                </div>

                {paymentMethod === 'card' && (
                  <div className="grid grid-cols-1 gap-6">
                    <Input
                      label="Card Number"
                      placeholder="1234 5678 9012 3456"
                      {...register('cardNumber', {
                        required: 'Card number is required'
                      })}
                      error={errors.cardNumber?.message}
                    />
                    
                    <div className="grid grid-cols-2 gap-6">
                      <Input
                        label="Expiry Date"
                        placeholder="MM/YY"
                        {...register('expiryDate', {
                          required: 'Expiry date is required'
                        })}
                        error={errors.expiryDate?.message}
                      />
                      
                      <Input
                        label="CVV"
                        placeholder="123"
                        {...register('cvv', {
                          required: 'CVV is required'
                        })}
                        error={errors.cvv?.message}
                      />
                    </div>
                    
                    <Input
                      label="Cardholder Name"
                      {...register('cardholderName', {
                        required: 'Cardholder name is required'
                      })}
                      error={errors.cardholderName?.message}
                    />
                  </div>
                )}
              </motion.div>

              {/* Place Order Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Button
                  type="submit"
                  size="large"
                  className="w-full"
                  loading={isProcessing}
                  disabled={isProcessing}
                >
                  <SafeIcon icon={FiLock} className="w-5 h-5 mr-2" />
                  {isProcessing ? 'Processing...' : `Place Order - $${grandTotal.toFixed(2)}`}
                </Button>
                
                <p className="text-xs text-gray-500 text-center mt-2">
                  Your payment information is secure and encrypted
                </p>
              </motion.div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-lg shadow-sm p-6 sticky top-8"
            >
              <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
              
              {/* Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              
              {/* Totals */}
              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                
                <div className="border-t pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-primary-600">
                      ${grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;