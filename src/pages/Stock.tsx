
import React, { useState } from 'react';
import { Package, Plus, Edit, Trash2, ArrowDown, ArrowUp, ClipboardList, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Stock = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const stockData = [
    {
      id: 1,
      name: 'Smartphone Galaxy A54',
      category: 'Eletrônicos',
      currentStock: 25,
      minStock: 5,
      maxStock: 100,
      unitPrice: 1299.90,
      costPrice: 899.90,
      lastEntry: '2024-01-10',
      lastExit: '2024-01-14',
      status: 'normal'
    },
    {
      id: 2,
      name: 'Tênis Nike Air Max',
      category: 'Calçados',
      currentStock: 3,
      minStock: 10,
      maxStock: 50,
      unitPrice: 599.90,
      costPrice: 399.90,
      lastEntry: '2024-01-08',
      lastExit: '2024-01-15',
      status: 'low'
    },
    {
      id: 3,
      name: 'Fone Bluetooth JBL',
      category: 'Eletrônicos',
      currentStock: 0,
      minStock: 5,
      maxStock: 30,
      unitPrice: 199.90,
      costPrice: 129.90,
      lastEntry: '2024-01-05',
      lastExit: '2024-01-15',
      status: 'out'
    },
  ];

  const stockMovements = [
    {
      id: 1,
      productName: 'Smartphone Galaxy A54',
      type: 'entrada',
      quantity: 10,
      date: '2024-01-15 09:30',
      user: 'Admin',
      reason: 'Compra fornecedor'
    },
    {
      id: 2,
      productName: 'Tênis Nike Air Max',
      type: 'saida',
      quantity: 2,
      date: '2024-01-15 14:20',
      user: 'Maria Santos (Vendedor)',
      reason: 'Venda #V001'
    },
  ];

  const handleStockEntry = (productId: number) => {
    // Simulando entrada real
    const product = stockData.find(p => p.id === productId);
    if (product) {
      toast({
        title: "Entrada de Estoque",
        description: `Entrada registrada para ${product.name}. Novo estoque: ${product.currentStock + 10}`,
      });
    }
  };

  const handleStockExit = (productId: number) => {
    // Simulando saída real
    const product = stockData.find(p => p.id === productId);
    if (product) {
      toast({
        title: "Saída de Estoque",
        description: `Saída registrada para ${product.name}. Novo estoque: ${Math.max(0, product.currentStock - 1)}`,
      });
    }
  };

  const handleInventory = () => {
    // Simulando inventário real
    toast({
      title: "Inventário Geral",
      description: "Processo de inventário completo iniciado. Verifique todos os produtos.",
    });
    // Aqui você redirecionaria para página de inventário
  };

  const handleEditProduct = (productId: number) => {
    // Simulando edição real
    const product = stockData.find(p => p.id === productId);
    if (product) {
      toast({
        title: "Editar Produto",
        description: `Editando ${product.name}. Funcionalidade em desenvolvimento.`,
      });
    }
  };

  const handleDeleteProduct = (productId: number) => {
    // Simulando exclusão real
    const product = stockData.find(p => p.id === productId);
    if (product) {
      toast({
        title: "Produto Excluído",
        description: `${product.name} foi removido do estoque.`,
        variant: "destructive"
      });
    }
  };

  const handleNewProduct = () => {
    toast({
      title: "Novo Produto",
      description: "Redirecionando para cadastro de novo produto...",
    });
  };

  const filteredStock = stockData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || item.status === filterType;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'default';
      case 'low': return 'secondary';
      case 'out': return 'destructive';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'normal': return 'Normal';
      case 'low': return 'Estoque Baixo';
      case 'out': return 'Sem Estoque';
      default: return 'Normal';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Controle de Estoque</h1>
          <p className="text-muted-foreground">Gerencie entradas, saídas e inventário</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleInventory} variant="outline">
            <ClipboardList className="mr-2 h-4 w-4" />
            Inventário Geral
          </Button>
          <Button onClick={handleNewProduct}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Produto
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Input 
            placeholder="Buscar produtos..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Status</SelectItem>
            <SelectItem value="normal">Estoque Normal</SelectItem>
            <SelectItem value="low">Estoque Baixo</SelectItem>
            <SelectItem value="out">Sem Estoque</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lista de Produtos */}
      <div className="grid gap-4">
        {filteredStock.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                  </div>
                </div>
                <Badge variant={getStatusColor(product.status)}>
                  {getStatusText(product.status)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Estoque Atual</p>
                  <p className={`text-xl font-bold ${
                    product.currentStock <= product.minStock ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {product.currentStock} un.
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Mín/Máx</p>
                  <p className="font-medium">{product.minStock}/{product.maxStock}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Preço Venda</p>
                  <p className="font-medium">R$ {product.unitPrice.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Preço Custo</p>
                  <p className="font-medium">R$ {product.costPrice.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Margem</p>
                  <p className="font-medium text-green-600">
                    {(((product.unitPrice - product.costPrice) / product.costPrice) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleStockEntry(product.id)}>
                  <ArrowDown className="h-4 w-4 mr-1 text-green-600" />
                  Entrada
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleStockExit(product.id)}>
                  <ArrowUp className="h-4 w-4 mr-1 text-red-600" />
                  Saída
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleEditProduct(product.id)}>
                  <Edit className="h-4 w-4 mr-1" />
                  Editar
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDeleteProduct(product.id)}>
                  <Trash2 className="h-4 w-4 mr-1" />
                  Excluir
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Últimas Movimentações */}
      <Card>
        <CardHeader>
          <CardTitle>Últimas Movimentações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stockMovements.map((movement) => (
              <div key={movement.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    movement.type === 'entrada' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {movement.type === 'entrada' ? 
                      <ArrowDown className="h-4 w-4 text-green-600" /> : 
                      <ArrowUp className="h-4 w-4 text-red-600" />
                    }
                  </div>
                  <div>
                    <p className="font-medium">{movement.productName}</p>
                    <p className="text-sm text-muted-foreground">{movement.reason}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${
                    movement.type === 'entrada' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {movement.type === 'entrada' ? '+' : '-'}{movement.quantity} un.
                  </p>
                  <p className="text-sm text-muted-foreground">{movement.date}</p>
                  <p className="text-xs text-muted-foreground">{movement.user}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Stock;
