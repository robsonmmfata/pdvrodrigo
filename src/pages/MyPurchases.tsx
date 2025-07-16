
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ShoppingBag, Package, Calendar, DollarSign, Search, Eye, Receipt, Star } from 'lucide-react';

const MyPurchases = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  const purchasesData = [
    {
      id: 'V2470',
      date: '2024-01-15 14:30',
      total: 8157.80,
      items: [
        { name: 'iPhone 15 Pro Max 256GB', quantity: 1, unitPrice: 7999.99, total: 7999.99 },
        { name: 'Capa MagSafe Transparente', quantity: 1, unitPrice: 157.81, total: 157.81 }
      ],
      paymentMethod: 'PIX',
      pointsEarned: 815,
      creditsUsed: 0,
      status: 'completed',
      seller: 'João Silva',
      store: 'Loja Centro'
    },
    {
      id: 'V2463',
      date: '2024-01-14 11:20',
      total: 4999.99,
      items: [
        { name: 'iPhone 14 128GB Azul', quantity: 1, unitPrice: 4999.99, total: 4999.99 }
      ],
      paymentMethod: 'Cartão',
      pointsEarned: 499,
      creditsUsed: 0,
      status: 'completed',
      seller: 'Maria Santos',
      store: 'Loja Shopping'
    },
    {
      id: 'V2458',
      date: '2024-01-13 16:45',
      total: 4699.97,
      items: [
        { name: 'iPhone 13 128GB Rosa', quantity: 1, unitPrice: 3799.99, total: 3799.99 },
        { name: 'AirPods 3ª Geração', quantity: 1, unitPrice: 299.99, total: 299.99 },
        { name: 'AppleCare+ para iPhone', quantity: 1, unitPrice: 599.99, total: 599.99 }
      ],
      paymentMethod: 'Dinheiro',
      pointsEarned: 469,
      creditsUsed: 0,
      status: 'completed',
      seller: 'Pedro Costa',
      store: 'Loja Centro'
    }
  ];

  const totalSpent = purchasesData.reduce((sum, purchase) => sum + purchase.total, 0);
  const totalPurchases = purchasesData.length;
  const totalPointsEarned = purchasesData.reduce((sum, purchase) => sum + purchase.pointsEarned, 0);
  const totalCreditsUsed = purchasesData.reduce((sum, purchase) => sum + purchase.creditsUsed, 0);

  const handleViewPurchaseDetails = (purchase: any) => {
    const itemsList = purchase.items.map((item: any) => 
      `${item.name} (${item.quantity}x R$${item.unitPrice.toFixed(2)})`
    ).join(', ');
    
    toast({
      title: `Detalhes da Compra ${purchase.id}`,
      description: `${itemsList} - Total: R$${purchase.total.toFixed(2)}`,
    });
  };

  const handleDownloadReceipt = (purchase: any) => {
    toast({
      title: "Comprovante de Compra",
      description: `Comprovante da compra ${purchase.id} baixado com sucesso.`,
    });
  };

  const handleRepeatPurchase = (purchase: any) => {
    toast({
      title: "Repetir Compra",
      description: `Adicionando itens da compra ${purchase.id} ao carrinho...`,
    });
  };

  const filteredPurchases = purchasesData.filter(purchase => 
    purchase.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    purchase.store.toLowerCase().includes(searchTerm.toLowerCase()) ||
    purchase.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getPaymentMethodColor = (method: string) => {
    switch (method.toLowerCase()) {
      case 'pix': return 'bg-green-100 text-green-800';
      case 'cartão': return 'bg-blue-100 text-blue-800';
      case 'dinheiro': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Minhas Compras</h1>
        <p className="text-muted-foreground">Histórico completo das suas compras</p>
      </div>

      {/* Resumo de Compras */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-green-500" />
              Total Gasto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              R$ {totalSpent.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">Em todas as compras</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <ShoppingBag className="h-4 w-4 text-blue-500" />
              Compras Realizadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {totalPurchases}
            </div>
            <p className="text-xs text-muted-foreground">Total de transações</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              Pontos Ganhos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {totalPointsEarned}
            </div>
            <p className="text-xs text-muted-foreground">Pontos acumulados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Créditos Usados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              R$ {totalCreditsUsed.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">Em descontos</p>
          </CardContent>
        </Card>
      </div>

      {/* Busca */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por código, loja ou produto..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Lista de Compras */}
      <div className="space-y-4">
        {filteredPurchases.map((purchase) => (
          <Card key={purchase.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <ShoppingBag className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Compra {purchase.id}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{purchase.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{purchase.store} - {purchase.seller}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getPaymentMethodColor(purchase.paymentMethod)}>
                    {purchase.paymentMethod}
                  </Badge>
                  <Badge variant="default">
                    {purchase.status === 'completed' ? 'Concluída' : 'Pendente'}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Itens da Compra */}
                <div>
                  <p className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Itens Comprados ({purchase.items.length})
                  </p>
                  <div className="grid gap-2">
                    {purchase.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-muted/50 rounded">
                        <span className="text-sm">{item.name}</span>
                        <span className="text-sm font-medium">
                          {item.quantity}x R$ {item.unitPrice.toFixed(2)} = R$ {item.total.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Resumo Financeiro */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="text-xl font-bold text-green-600">
                      R$ {purchase.total.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pontos Ganhos</p>
                    <p className="font-bold text-yellow-600">+{purchase.pointsEarned} pts</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Créditos Usados</p>
                    <p className="font-bold text-purple-600">
                      {purchase.creditsUsed > 0 ? `R$ ${purchase.creditsUsed.toFixed(2)}` : '-'}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleViewPurchaseDetails(purchase)}>
                      <Eye className="h-4 w-4 mr-1" />
                      Detalhes
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDownloadReceipt(purchase)}>
                      <Receipt className="h-4 w-4 mr-1" />
                      Recibo
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleRepeatPurchase(purchase)}>
                      <ShoppingBag className="h-4 w-4 mr-1" />
                      Repetir
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPurchases.length === 0 && (
        <div className="text-center py-8">
          <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            {searchTerm 
              ? 'Nenhuma compra encontrada com os filtros aplicados'
              : 'Você ainda não realizou nenhuma compra'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default MyPurchases;
