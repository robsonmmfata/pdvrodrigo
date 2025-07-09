
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
  const { state } = useSidebar();
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
  const isCollapsed = state === 'collapsed';

  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar className={isCollapsed ? 'w-16' : 'w-64'} collapsible="icon">
      <SidebarContent className="bg-sidebar border-r border-sidebar-border">
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
              <Store className="h-4 w-4 text-sidebar-primary-foreground" />
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="font-semibold text-sidebar-foreground">Sistema Multiloja</h2>
                <p className="text-xs text-sidebar-foreground/70 capitalize">{user?.role}</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70">Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink 
                      to={item.url} 
                      className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[active=true]:font-medium"
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {!isCollapsed && <span>{item.title}</span>}
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
