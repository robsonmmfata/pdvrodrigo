
import React from 'react';
import { Plus, User, Store, TrendingUp, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Sellers = () => {
  const sellers = [
    { 
      id: '1', 
      name: 'João Silva', 
      email: 'joao@email.com', 
      store: 'Loja Centro', 
      active: true, 
      sales: 42, 
      revenue: 5280.50,
      lastLogin: '2024-01-15 14:30'
    },
    { 
      id: '2', 
      name: 'Maria Santos', 
      email: 'maria@email.com', 
      store: 'Loja Shopping', 
      active: true, 
      sales: 67, 
      revenue: 8950.75,
      lastLogin: '2024-01-15 16:45'
    },
    { 
      id: '3', 
      name: 'Pedro Costa', 
      email: 'pedro@email.com', 
      store: 'Loja Centro', 
      active: false, 
      sales: 23, 
      revenue: 2840.00,
      lastLogin: '2024-01-10 09:15'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gerenciar Vendedores</h1>
          <p className="text-muted-foreground">Administre todos os vendedores do sistema</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Vendedor
        </Button>
      </div>

      <div className="grid gap-6">
        {sellers.map((seller) => (
          <Card key={seller.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>
                      {seller.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{seller.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{seller.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Store className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{seller.store}</span>
                    </div>
                  </div>
                </div>
                <Badge variant={seller.active ? "default" : "secondary"}>
                  {seller.active ? "Ativo" : "Bloqueado"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{seller.sales}</div>
                  <div className="text-sm text-muted-foreground">Vendas (mês)</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    R$ {seller.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-sm text-muted-foreground">Faturamento</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium">{seller.lastLogin}</div>
                  <div className="text-sm text-muted-foreground">Último acesso</div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="mr-1 h-4 w-4" />
                    Ver Detalhes
                  </Button>
                  <Button 
                    variant={seller.active ? "destructive" : "default"} 
                    size="sm"
                  >
                    {seller.active ? "Bloquear" : "Ativar"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Sellers;
