
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ShoppingCart, Users, Package, DollarSign,
  TrendingUp, Clock, CheckCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const SellerDashboard = () => {
  const { user, currentStore } = useAuth();

  const sellerStats = [
    {
      title: 'Vendas Hoje',
      value: 'R$ 847,50',
      description: '5 vendas realizadas',
      icon: DollarSign,
      color: 'text-green-600',
    },
    {
      title: 'Clientes Atendidos',
      value: '12',
      description: 'Hoje',
      icon: Users,
      color: 'text-blue-600',
    },
    {
      title: 'Produtos Vendidos',
      value: '28',
      description: 'Unidades hoje',
      icon: Package,
      color: 'text-purple-600',
    },
    {
      title: 'Meta do Mês',
      value: '68%',
      description: 'R$ 6.800 de R$ 10.000',
      icon: TrendingUp,
      color: 'text-orange-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Painel do Vendedor</h1>
        <p className="text-gray-600 mt-1">
          Bem-vindo, {user?.name}! Suas vendas em {currentStore?.name}
        </p>
      </div>

      {/* Cards de Estatísticas do Vendedor */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sellerStats.map((card, index) => (
          <Card key={index}>
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
        {/* Vendas Recentes do Vendedor */}
        <Card>
          <CardHeader>
            <CardTitle>Minhas Vendas Recentes</CardTitle>
            <CardDescription>Últimas transações realizadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Venda #{1000 + i}</p>
                    <p className="text-sm text-gray-500">Cliente João Silva</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">R$ {(Math.random() * 300 + 50).toFixed(2)}</p>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      Concluída
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tarefas Pendentes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-orange-500" />
              Tarefas Pendentes
            </CardTitle>
            <CardDescription>Ações que requerem sua atenção</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div>
                  <p className="font-medium">Cadastrar Cliente Pendente</p>
                  <p className="text-sm text-gray-500">Maria dos Santos - (11) 99999-8888</p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Pendente
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium">Atualizar Estoque</p>
                  <p className="text-sm text-gray-500">3 produtos com quantidade baixa</p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Urgente
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium">Meta Mensal</p>
                  <p className="text-sm text-gray-500">Faltam R$ 3.200 para atingir a meta</p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    68%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SellerDashboard;
