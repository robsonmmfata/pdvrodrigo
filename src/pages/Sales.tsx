
import React, { useState } from 'react';
import { ShoppingCart, Calendar, DollarSign, User, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import Filters from '@/components/ui/filters';

const Sales = () => {
  const { toast } = useToast();
  const [sales, setSales] = useState([
    {
      id: 'V001',
      customer: 'João Silva',
      seller: 'Maria Santos',
      total: 8157.80,
      payment: 'Pix',
      date: '2024-01-15 14:30',
      items: 2,
      status: 'Concluída'
    },
    {
      id: 'V002',
      customer: 'Ana Costa',
      seller: 'Pedro Lima',
      total: 4999.99,
      payment: 'Cartão',
      date: '2024-01-15 15:45',
      items: 1,
      status: 'Concluída'
    },
    {
      id: 'V003',
      customer: 'Carlos Oliveira',
      seller: 'Maria Santos',
      total: 4699.97,
      payment: 'Dinheiro',
      date: '2024-01-15 16:20',
      items: 3,
      status: 'Concluída'
    },
    {
      id: 'V004',
      customer: 'Fernanda Lima',
      seller: 'João Silva',
      total: 2299.99,
      payment: 'PIX',
      date: '2024-01-16 10:15',
      items: 1,
      status: 'Concluída'
    },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<any>({});

  const handleSearch = () => {
    toast({
      title: "Busca Realizada",
      description: `Buscando por: "${searchTerm}"`,
    });
  };

  const handleViewDetails = (sale: any) => {
    const saleDetails = `
Venda: ${sale.id}
Cliente: ${sale.customer}
Vendedor: ${sale.seller}
Total: R$ ${sale.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
Pagamento: ${sale.payment}
Data: ${sale.date}
Itens: ${sale.items} produtos
Status: ${sale.status}
    `;
    
    alert(saleDetails);
  };

  const filteredSales = sales.filter(sale => {
    const matchesSearch = sale.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sale.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sale.seller.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !filters.status || sale.status === filters.status;
    const matchesPayment = !filters.paymentMethod || sale.payment === filters.paymentMethod;
    
    return matchesSearch && matchesStatus && matchesPayment;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Vendas</h1>
          <p className="text-muted-foreground">Histórico de todas as vendas</p>
        </div>
        <Filters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onSearch={handleSearch}
          filters={filters}
          onFilterChange={setFilters}
          onClearFilters={() => setFilters({})}
          options={{
            statuses: ['Concluída', 'Pendente', 'Cancelada'],
            paymentMethods: ['Pix', 'Cartão', 'Dinheiro'],
          }}
          placeholder="Buscar vendas..."
        />
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
                      {sale.customer} • Vendedor: {sale.seller}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={sale.status === 'Concluída' ? 'default' : 'secondary'}>
                    {sale.status}
                  </Badge>
                  <Button variant="outline" size="sm" onClick={() => handleViewDetails(sale)}>
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
    </div>
  );
};

export default Sales;
