
import React, { useState } from 'react';
import { Bell, Search, User, Settings, LogOut, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { NotificationCenter } from '@/components/notifications/NotificationCenter';
import { useSidebar } from '@/components/ui/sidebar';

export const Header = () => {
  const { user, logout, currentStore } = useAuth();
  const navigate = useNavigate();
  const { toggleSidebar } = useSidebar();
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Implementar busca global funcional
      if (user?.role === 'admin') {
        // Admin pode buscar em tudo
        if (searchTerm.toLowerCase().includes('cliente')) {
          navigate('/customers');
        } else if (searchTerm.toLowerCase().includes('produto')) {
          navigate('/products');
        } else if (searchTerm.toLowerCase().includes('venda')) {
          navigate('/sales');
        } else if (searchTerm.toLowerCase().includes('loja')) {
          navigate('/stores');
        } else {
          navigate('/customers'); // Default para clientes
        }
      } else if (user?.role === 'seller') {
        // Vendedor pode buscar clientes, produtos, vendas
        if (searchTerm.toLowerCase().includes('produto')) {
          navigate('/products');
        } else if (searchTerm.toLowerCase().includes('venda')) {
          navigate('/sales-history');
        } else {
          navigate('/customers'); // Default para clientes
        }
      } else {
        // Cliente busca em suas próprias informações
        navigate('/my-purchases');
      }
      
      // Busca global realizada
    }
  };

  const handleNotificationNavigate = (url: string) => {
    navigate(url);
  };

  const getUserInitials = () => {
    if (!user?.name) return 'U';
    return user.name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getRoleDisplay = () => {
    switch (user?.role) {
      case 'admin': return 'Administrador';
      case 'seller': return 'Vendedor';
      case 'customer': return 'Cliente';
      default: return 'Usuário';
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2">
          {/* Busca Global */}
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar produtos, clientes, vendas..."
                className="w-full pl-8 md:w-[300px] lg:w-[400px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
          </div>

          <div className="flex items-center space-x-2">
            {/* Centro de Notificações */}
            <NotificationCenter onNavigate={handleNotificationNavigate} />

            {/* Menu do Usuário */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-72" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-2">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {getRoleDisplay()}
                    </p>
                    {currentStore && (
                      <p className="text-xs leading-none text-muted-foreground">
                        {currentStore.name}
                      </p>
                    )}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                {user?.role === 'customer' ? (
                  <>
                    <DropdownMenuItem onClick={() => navigate('/my-points')}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Meus Pontos</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/my-credits')}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Meus Créditos</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/my-purchases')}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Minhas Compras</span>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem onClick={() => navigate('/settings')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Perfil</span>
                  </DropdownMenuItem>
                )}
                
                <DropdownMenuItem onClick={() => navigate('/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configurações</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};
