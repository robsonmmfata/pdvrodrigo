
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Store, Users, ShoppingCart, Package, CreditCard, Gift,
  BarChart3, Settings, User, History, Award
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/AuthContext';

export const AppSidebar = () => {
  const { collapsed } = useSidebar();
  const location = useLocation();
  const { user } = useAuth();

  const adminMenuItems = [
    { title: 'Dashboard', url: '/dashboard', icon: BarChart3 },
    { title: 'Lojas', url: '/stores', icon: Store },
    { title: 'Vendedores', url: '/sellers', icon: Users },
    { title: 'Clientes', url: '/customers', icon: User },
    { title: 'Produtos', url: '/products', icon: Package },
    { title: 'Vendas', url: '/sales', icon: ShoppingCart },
    { title: 'Créditos', url: '/credits', icon: CreditCard },
    { title: 'Fidelidade', url: '/loyalty', icon: Gift },
    { title: 'Relatórios', url: '/reports', icon: BarChart3 },
    { title: 'Configurações', url: '/settings', icon: Settings },
  ];

  const sellerMenuItems = [
    { title: 'Nova Venda', url: '/new-sale', icon: ShoppingCart },
    { title: 'Clientes', url: '/customers', icon: Users },
    { title: 'Produtos', url: '/products', icon: Package },
    { title: 'Histórico', url: '/sales-history', icon: History },
    { title: 'Estoque', url: '/inventory', icon: Package },
  ];

  const customerMenuItems = [
    { title: 'Meus Pontos', url: '/my-points', icon: Award },
    { title: 'Meus Créditos', url: '/my-credits', icon: CreditCard },
    { title: 'Histórico', url: '/my-purchases', icon: History },
    { title: 'Perfil', url: '/profile', icon: User },
  ];

  const getMenuItems = () => {
    switch (user?.role) {
      case 'admin':
        return adminMenuItems;
      case 'seller':
        return sellerMenuItems;
      case 'customer':
        return customerMenuItems;
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
      isActive 
        ? 'bg-primary text-primary-foreground font-medium' 
        : 'hover:bg-muted text-gray-700'
    }`;

  return (
    <Sidebar className={collapsed ? 'w-16' : 'w-64'} collapsible>
      <SidebarContent className="bg-white border-r">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <Store className="h-4 w-4 text-primary-foreground" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="font-semibold text-gray-900">Sistema Multiloja</h2>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavCls}
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
