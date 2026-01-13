import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import SellerUploadPage from './pages/seller/SellerUploadPage';
import AdminLayout from './components/layout/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import VerificationQueue from './pages/admin/VerificationQueue';
import ProductManagement from './pages/admin/ProductManagement';
import CategoryManagement from './pages/admin/CategoryManagement';
import ManufacturerManagement from './pages/admin/ManufacturerManagement';
import { CartProvider } from './context/CartContext';
import CartPage from './pages/cart/CartPage';
import DashboardLayout from './components/layout/DashboardLayout';
import ProfilePage from './pages/dashboard/ProfilePage';
import MyListingsPage from './pages/dashboard/MyListingsPage';
import OrdersPage from './pages/dashboard/OrdersPage';
import CheckoutPage from './pages/checkout/CheckoutPage';
import BrowsePage from './pages/browse/BrowsePage';

import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage></CheckoutPage>} />
              
              {/* User Dashboard */}
              <Route path="/dashboard" element={<DashboardLayout />}>
                  <Route index element={<ProfilePage />} /> {/* Default to profile */}
                  <Route path="profile" element={<ProfilePage />} />
                  <Route path="listings" element={<MyListingsPage></MyListingsPage>} />
                  <Route path="orders" element={<OrdersPage />} />
                  <Route path="address" element={<div className="p-4">Address Book (Coming Soon)</div>} />
                  <Route path="settings" element={<div className="p-4">Settings (Coming Soon)</div>} />
              </Route>

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="products" element={<ProductManagement />} />
                <Route path="categories" element={<CategoryManagement />} />
                <Route path="manufacturers" element={<ManufacturerManagement />} />
                <Route path="verify" element={<VerificationQueue />} />
              </Route>
  
              <Route path="/browse" element={<BrowsePage />} />
              <Route path="/sell" element={<div className="container py-8"><SellerUploadPage /></div>} />
            </Routes>
          </Layout>
          <Toaster />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
