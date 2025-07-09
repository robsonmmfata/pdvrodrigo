
import React, { useState } from 'react';
import { ShoppingCart, Calendar, DollarSign, User, Eye, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const SalesHistory = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  const salesHistory = [
    {
      id: 'V001',
      customer: 'João Silva',
      total: 150.50,
      payment: 'Pix',
      date: '2024-01-15 14:30',
      items: 3,
      status: 'Concluída'
    },
    {
      id: 'V002',
      customer: 'Ana Costa',
      total: 89.90,
      payment: 'Cartão',
      date: '2024-01-15 15:45',
      items: 2,
      status: 'Concluída'
    },
    {
      id: 'V003',
      customer: 'Carlos Oliveira',
      total: 245.80,
      payment: 'Dinheiro',
      date: '2024-01-15 16:20',
      items: 5,
      status: 'Pendente'
    },
  ];

  const handleSearch = () => {
    if (searchTerm.trim()) {
      toast({
        title: "Busca realizada",
        description: `Buscando por: "${searchTerm}"`,
      });
    }
  };

  const handleViewDetails = (sale: any) => {
    toast({
      title: "Detalhes da Venda",
      description: `Visualizando venda ${sale.id} - ${sale.customer}`,
    });
  };

  const filteredSales = salesHistory.filter(sale => 
    sale.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sale.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Histórico de Vendas</h1>
          <p className="text-muted-foreground">Suas vendas realizadas</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Input 
              placeholder="Buscar vendas..." 
              className="w-64 pr-10" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button 
              variant="ghost" 
              size="sm" 
              className="absolute right-0 top-0 h-full px-3"
              onClick={handleSearch}
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredSales.map((sale) => (
          <Card key={sale.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <ShoppingCart className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Venda {sale.id}</CardTitle>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {sale.customer}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={sale.status === 'Concluída' ? 'default' : 'secondary'}>
                    {sale.status}
                  </Badge>
                  <Button variant="outline" size="sm" onClick={() => handleViewDetails(sale)}>
                    <Eye className="h-4 w-4 mr-1" />
                    Ver Detalhes
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-xl font-bold text-green-600">
                    R$ {sale.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pagamento</p>
                  <p className="font-medium">{sale.payment}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Itens</p>
                  <p className="font-medium">{sale.items} produtos</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Data/Hora</p>
                  <p className="font-medium flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {sale.date}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSales.length === 0 && searchTerm && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Nenhuma venda encontrada para "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
};

export default SalesHistory;
