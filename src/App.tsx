
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { LoginForm } from "@/components/Auth/LoginForm";
import { MainLayout } from "@/components/Layout/MainLayout";
import Dashboard from "@/pages/Dashboard";
import SellerDashboard from "@/pages/SellerDashboard";
import NewSale from "@/pages/NewSale";
import Stores from "@/pages/Stores";
import Sellers from "@/pages/Sellers";
import Customers from "@/pages/Customers";
import Products from "@/pages/Products";
import Sales from "@/pages/Sales";
import Credits from "@/pages/Credits";
import Loyalty from "@/pages/Loyalty";
import Reports from "@/pages/Reports";
import Settings from "@/pages/Settings";
import Stock from "@/pages/Stock";
import Inventory from "@/pages/Inventory";
import SalesHistory from "@/pages/SalesHistory";
import MyPoints from "@/pages/MyPoints";
import MyCredits from "@/pages/MyCredits";
import MyPurchases from "@/pages/MyPurchases";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // Redirecionamento baseado no tipo de usuário após login
  const getDefaultRoute = () => {
    switch (user.role) {
      case 'admin':
        return '/dashboard';
      case 'seller':
        return '/seller-dashboard';
      case 'customer':
        return '/my-points';
      default:
        return '/dashboard';
    }
  };

  return (
    <Routes>
      <Route path="/login" element={<Navigate to={getDefaultRoute()} replace />} />
      <Route path="/" element={<Navigate to={getDefaultRoute()} replace />} />
      <Route path="/" element={<MainLayout />}>
        {/* Rotas do Admin */}
        {user.role === 'admin' && (
          <>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="stores" element={<Stores />} />
            <Route path="sellers" element={<Sellers />} />
            <Route path="customers" element={<Customers />} />
            <Route path="products" element={<Products />} />
            <Route path="stock" element={<Stock />} />
            <Route path="sales" element={<Sales />} />
            <Route path="credits" element={<Credits />} />
            <Route path="loyalty" element={<Loyalty />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
          </>
        )}
        
        {/* Rotas do Vendedor */}
        {user.role === 'seller' && (
          <>
            <Route path="seller-dashboard" element={<SellerDashboard />} />
            <Route path="new-sale" element={<NewSale />} />
            <Route path="customers" element={<Customers />} />
            <Route path="products" element={<Products />} />
            <Route path="sales-history" element={<SalesHistory />} />
            <Route path="inventory" element={<Inventory />} />
          </>
        )}
        
        {/* Rotas do Cliente */}
        {user.role === 'customer' && (
          <>
            <Route path="my-points" element={<MyPoints />} />
            <Route path="my-credits" element={<MyCredits />} />
            <Route path="my-purchases" element={<MyPurchases />} />
            <Route path="profile" element={<Settings />} />
          </>
        )}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
