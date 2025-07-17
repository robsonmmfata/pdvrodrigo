
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, User, Phone, Mail, Calendar, TrendingUp, DollarSign, Award } from 'lucide-react';

interface Seller {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  storeId: string;
  storeName: string;
  active: boolean;
  hireDate: string;
}

interface SellerDetailsProps {
  seller: Seller;
  onClose: () => void;
}

export const SellerDetails = ({ seller, onClose }: SellerDetailsProps) => {
  const sellerStats = {
    totalSales: 28450.75,
    salesCount: 67,
    avgSaleValue: 424.64,
    monthlyGoal: 30000,
    goalProgress: 94.8,
    topProducts: [
      { name: 'iPhone 15 Pro Max 256GB', quantity: 8 },
      { name: 'iPhone 14 128GB', quantity: 12 },
      { name: 'iPhone 13 128GB', quantity: 9 }
    ],
    recentSales: [
      { id: 'V1045', date: '2024-01-15', value: 7999.99, customer: 'João Silva' },
      { id: 'V1044', date: '2024-01-15', value: 4999.99, customer: 'Maria Santos' },
      { id: 'V1043', date: '2024-01-14', value: 3799.99, customer: 'Ana Oliveira' }
    ]
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Detalhes do Vendedor
        </CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informações Pessoais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{seller.name}</p>
                  <p className="text-sm text-muted-foreground">Nome</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{seller.email}</p>
                  <p className="text-sm text-muted-foreground">E-mail</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{seller.phone}</p>
                  <p className="text-sm text-muted-foreground">Telefone</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{formatDate(seller.hireDate)}</p>
                  <p className="text-sm text-muted-foreground">Data de Contratação</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant={seller.active ? 'default' : 'secondary'}>
                  {seller.active ? 'Ativo' : 'Inativo'}
                </Badge>
                <Badge variant="outline">{seller.role}</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Performance de Vendas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-green-600">
                    R$ {sellerStats.totalSales.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-sm text-muted-foreground">Vendas do Mês</p>
                </div>
                
                <div className="text-center">
                  <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-blue-600">{sellerStats.salesCount}</p>
                  <p className="text-sm text-muted-foreground">Vendas Realizadas</p>
                </div>
              </div>

              <div className="text-center">
                <Award className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <p className="text-xl font-bold">{sellerStats.goalProgress}%</p>
                <p className="text-sm text-muted-foreground">Meta Mensal</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-yellow-600 h-2 rounded-full" 
                    style={{ width: `${Math.min(sellerStats.goalProgress, 100)}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Produtos Mais Vendidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sellerStats.topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="font-bold text-primary">{index + 1}</span>
                    </div>
                    <p className="font-medium">{product.name}</p>
                  </div>
                  <Badge variant="secondary">{product.quantity} vendas</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vendas Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sellerStats.recentSales.map((sale) => (
                <div key={sale.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Venda #{sale.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(sale.date)} - {sale.customer}
                    </p>
                  </div>
                  <p className="font-bold text-green-600">
                    R$ {sale.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};
