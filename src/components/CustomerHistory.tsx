
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, ShoppingBag, Calendar, CreditCard, Gift } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  whatsapp: string;
  loyaltyPoints: number;
  credits: number;
  totalPurchases: number;
  lastPurchase: string;
  totalSpent: number;
}

interface Purchase {
  id: string;
  date: string;
  total: number;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  paymentMethod: string;
  pointsEarned: number;
}

interface CustomerHistoryProps {
  customer: Customer;
  onClose: () => void;
}

export const CustomerHistory = ({ customer, onClose }: CustomerHistoryProps) => {
  // Mock data baseado nos iPhones do sistema
  const purchases: Purchase[] = [
    {
      id: 'V1001',
      date: '2024-01-15',
      total: 7999.99,
      items: [
        { name: 'iPhone 15 Pro Max 256GB', quantity: 1, price: 7999.99 }
      ],
      paymentMethod: 'PIX',
      pointsEarned: 80
    },
    {
      id: 'V1002',
      date: '2024-01-10',
      total: 4999.99,
      items: [
        { name: 'iPhone 14 128GB', quantity: 1, price: 4999.99 }
      ],
      paymentMethod: 'Cartão',
      pointsEarned: 50
    },
    {
      id: 'V1003',
      date: '2024-01-08',
      total: 6099.98,
      items: [
        { name: 'iPhone 13 128GB', quantity: 1, price: 3799.99 },
        { name: 'iPhone SE 64GB', quantity: 1, price: 2299.99 }
      ],
      paymentMethod: 'Dinheiro',
      pointsEarned: 61
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getPaymentMethodBadge = (method: string) => {
    const colors = {
      'PIX': 'default',
      'Cartão': 'secondary',
      'Dinheiro': 'outline'
    };
    return colors[method as keyof typeof colors] || 'default';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Histórico de Compras - {customer.name}
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 bg-muted/50 rounded-lg">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{customer.totalPurchases}</p>
              <p className="text-sm text-muted-foreground">Total de Compras</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                R$ {customer.totalSpent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
              <p className="text-sm text-muted-foreground">Total Gasto</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{customer.loyaltyPoints}</p>
              <p className="text-sm text-muted-foreground">Pontos Acumulados</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                R$ {customer.credits.toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground">Créditos</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {purchases.map((purchase) => (
          <Card key={purchase.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">Compra #{purchase.id}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{formatDate(purchase.date)}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-green-600">
                    R$ {purchase.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                  <Badge variant={getPaymentMethodBadge(purchase.paymentMethod) as any}>
                    {purchase.paymentMethod}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold mb-2">Itens Comprados:</h4>
                  <div className="space-y-2">
                    {purchase.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-muted/30 rounded">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">Quantidade: {item.quantity}</p>
                        </div>
                        <p className="font-medium">
                          R$ {item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-2">
                    <Gift className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm">Pontos ganhos: {purchase.pointsEarned}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{purchase.paymentMethod}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {purchases.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Nenhuma compra realizada ainda</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
