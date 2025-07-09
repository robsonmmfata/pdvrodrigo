
import React from 'react';
import { Gift, User, Star, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const Loyalty = () => {
  const loyaltyData = [
    {
      id: 'L001',
      customer: 'João Silva',
      points: 450,
      totalSpent: 4500.00,
      lastPurchase: '2024-01-15',
      level: 'Ouro'
    },
    {
      id: 'L002',
      customer: 'Ana Costa',
      points: 285,
      totalSpent: 2850.00,
      lastPurchase: '2024-01-14',
      level: 'Prata'
    },
    {
      id: 'L003',
      customer: 'Carlos Oliveira',
      points: 120,
      totalSpent: 1200.00,
      lastPurchase: '2024-01-13',
      level: 'Bronze'
    },
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Ouro': return 'bg-yellow-100 text-yellow-800';
      case 'Prata': return 'bg-gray-100 text-gray-800';
      case 'Bronze': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Sistema de Fidelidade</h1>
          <p className="text-muted-foreground">Gerenciar pontos e recompensas dos clientes</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total de Pontos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">855</div>
            <p className="text-xs text-muted-foreground">Pontos ativos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Clientes Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">3</div>
            <p className="text-xs text-muted-foreground">Com pontos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Nível Médio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">Prata</div>
            <p className="text-xs text-muted-foreground">Dos clientes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Gasto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">R$ 8.550</div>
            <p className="text-xs text-muted-foreground">Valor acumulado</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4">
        {loyaltyData.map((customer) => (
          <Card key={customer.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Gift className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <User className="h-5 w-5" />
                      {customer.customer}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Última compra: {customer.lastPurchase}
                    </p>
                  </div>
                </div>
                <Badge className={getLevelColor(customer.level)}>
                  <Star className="h-3 w-3 mr-1" />
                  {customer.level}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Pontos Acumulados</p>
                  <div className="flex items-center gap-2">
                    <div className="text-2xl font-bold text-purple-600">{customer.points}</div>
                    <div className="text-sm text-muted-foreground">pts</div>
                  </div>
                  <Progress value={(customer.points / 500) * 100} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {500 - customer.points} pontos para próximo nível
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Gasto</p>
                  <p className="text-xl font-bold text-green-600">
                    R$ {customer.totalSpent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3" />
                    1% = {customer.points} pontos
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Valor em Pontos</p>
                  <p className="text-xl font-bold text-blue-600">
                    R$ {(customer.points / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Disponível para uso
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Loyalty;
