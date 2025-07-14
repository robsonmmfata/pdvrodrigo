
import React from 'react';
import { ShoppingBag, Calendar, DollarSign, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const MyPurchases = () => {
  const { toast } = useToast();
  const purchases = [
    {
      id: 'C001',
      date: '2024-01-15 14:30',
      total: 150.50,
      payment: 'Pix',
      items: [
        { name: 'Produto A', quantity: 2, price: 25.90 },
        { name: 'Produto B', quantity: 1, price: 98.70 }
      ],
      pointsEarned: 150,
      store: 'Loja Centro'
    },
    {
      id: 'C002',
      date: '2024-01-14 16:45',
      total: 89.90,
      payment: 'Cartão',
      items: [
        { name: 'Produto C', quantity: 1, price: 89.90 }
      ],
      pointsEarned: 89,
      store: 'Loja Centro'
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Minhas Compras</h1>
        <p className="text-muted-foreground">Histórico das suas compras</p>
      </div>

      <div className="grid gap-4">
        {purchases.map((purchase) => (
          <Card key={purchase.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <ShoppingBag className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Compra {purchase.id}</CardTitle>
                    <p className="text-sm text-muted-foreground">{purchase.store}</p>
                  </div>
                </div>
                <Badge variant="default">Concluída</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Pago</p>
                  <p className="text-xl font-bold text-green-600">
                    R$ {purchase.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Forma de Pagamento</p>
                  <p className="font-medium">{purchase.payment}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Data/Hora</p>
                  <p className="font-medium flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {purchase.date}
                  </p>
                </div>
              </div>

              {/* Itens da compra */}
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Itens Comprados
                </h4>
                <div className="space-y-2">
                  {purchase.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-muted/50 rounded">
                      <div>
                        <span className="font-medium">{item.name}</span>
                        <span className="text-sm text-muted-foreground ml-2">x{item.quantity}</span>
                      </div>
                      <span className="font-medium">
                        R$ {item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pontos ganhos */}
              <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800">
                  🎉 Você ganhou <strong>{purchase.pointsEarned} pontos</strong> nesta compra!
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyPurchases;
