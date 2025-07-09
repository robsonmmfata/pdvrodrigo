
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  DollarSign, ShoppingCart, Users, Package, 
  TrendingUp, CreditCard, Gift, AlertTriangle, Eye, Plus 
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const Dashboard = () => {
  const { user, currentStore } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const statsCards = [
    {
      title: 'Vendas Hoje',
      value: 'R$ 2.847,50',
      description: '+12% em relação a ontem',
      icon: DollarSign,
      color: 'text-green-600',
      onClick: () => navigate('/sales')
    },
    {
      title: 'Pedidos',
      value: '47',
      description: '8 pedidos nas últimas 2h',
      icon: ShoppingCart,
      color: 'text-blue-600',
      onClick: () => navigate('/sales')
    },
    {
      title: 'Clientes',
      value: '1.234',
      description: '+23 novos este mês',
      icon: Users,
      color: 'text-purple-600',
      onClick: () => navigate('/customers')
    },
    {
      title: 'Produtos',
      value: '189',
      description: '12 com estoque baixo',
      icon: Package,
      color: 'text-orange-600',
      onClick: () => navigate('/products')
    },
  ];

  const loyaltyStats = [
    {
      title: 'Pontos Ativos',
      value: '12.847',
      description: 'R$ 128,47 em pontos',
      icon: Gift,
      color: 'text-pink-600',
      onClick: () => navigate('/loyalty')
    },
    {
      title: 'Créditos Pendentes',
      value: 'R$ 285,30',
      description: '8 aprovações pendentes',
      icon: CreditCard,
      color: 'text-indigo-600',
      onClick: () => navigate('/credits')
    },
  ];

  const handleNewSale = () => {
    toast({
      title: "Nova Venda",
      description: "Redirecionando para o sistema de vendas...",
    });
    navigate('/sales');
  };

  const handleViewReports = () => {
    navigate('/reports');
  };

  const handleViewSales = () => {
    navigate('/sales');
  };

  const handleViewProducts = () => {
    navigate('/products');
  };

  const handleViewCustomers = () => {
    navigate('/customers');
  };

  const handleProductClick = (productName: string) => {
    toast({
      title: "Produto Selecionado",
      description: `Visualizando detalhes de ${productName}`,
    });
    navigate('/products');
  };

  const handleSaleClick = (saleId: string) => {
    toast({
      title: "Venda Selecionada",
      description: `Visualizando detalhes da ${saleId}`,
    });
    navigate('/sales');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Bem-vindo, {user?.name}! Visão geral de {currentStore?.name}
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleNewSale}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Venda
          </Button>
          <Button variant="outline" onClick={handleViewReports}>
            <TrendingUp className="mr-2 h-4 w-4" />
            Relatórios
          </Button>
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card, index) => (
          <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow" onClick={card.onClick}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">{card.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Cards de Fidelidade e Créditos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loyaltyStats.map((card, index) => (
          <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow" onClick={card.onClick}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">{card.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vendas Recentes */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Vendas Recentes</CardTitle>
              <CardDescription>Últimas transações da loja</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={handleViewSales}>
              <Eye className="h-4 w-4 mr-1" />
              Ver Todas
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg cursor-pointer" onClick={() => handleSaleClick(`Venda #${2000 + i}`)}>
                  <div>
                    <p className="font-medium">Venda #{2000 + i}</p>
                    <p className="text-sm text-gray-500">Cliente João Silva</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">R$ {(Math.random() * 500 + 50).toFixed(2)}</p>
                    <p className="text-sm text-gray-500">Há {i} min</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Produtos com Estoque Baixo */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-500" />
                Estoque Baixo
              </CardTitle>
              <CardDescription>Produtos que precisam de reposição</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={handleViewProducts}>
              <Eye className="h-4 w-4 mr-1" />
              Ver Produtos
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Produto A', stock: 3, min: 10 },
                { name: 'Produto B', stock: 1, min: 5 },
                { name: 'Produto C', stock: 7, min: 15 },
                { name: 'Produto D', stock: 2, min: 8 },
              ].map((product, i) => (
                <div key={i} className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg cursor-pointer" onClick={() => handleProductClick(product.name)}>
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-500">Mín: {product.min} unidades</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      {product.stock} restantes
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
