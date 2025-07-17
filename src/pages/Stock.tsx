
import React, { useState } from 'react';
import { Package, Plus, Edit, Trash2, ArrowDown, ArrowUp, ClipboardList, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StockMovement } from '@/components/StockMovement';

const Stock = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showMovement, setShowMovement] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [movementType, setMovementType] = useState<'entrada' | 'saida'>('entrada');
  const [showInventory, setShowInventory] = useState(false);

  const [stockData, setStockData] = useState([
    {
      id: 1,
      name: 'iPhone 15 Pro Max 256GB',
      category: 'Smartphones',
      currentStock: 25,
      minStock: 5,
      maxStock: 100,
      unitPrice: 7999.99,
      costPrice: 6999.99,
      lastEntry: '2024-01-10',
      lastExit: '2024-01-14',
      status: 'normal'
    },
    {
      id: 2,
      name: 'iPhone 14 128GB',
      category: 'Smartphones',
      currentStock: 3,
      minStock: 10,
      maxStock: 50,
      unitPrice: 4999.99,
      costPrice: 3999.99,
      lastEntry: '2024-01-08',
      lastExit: '2024-01-15',
      status: 'low'
    },
    {
      id: 3,
      name: 'iPhone 13 128GB',
      category: 'Smartphones',
      currentStock: 0,
      minStock: 5,
      maxStock: 30,
      unitPrice: 3799.99,
      costPrice: 2999.99,
      lastEntry: '2024-01-05',
      lastExit: '2024-01-15',
      status: 'out'
    },
    {
      id: 4,
      name: 'iPhone SE 64GB',
      category: 'Smartphones',
      currentStock: 15,
      minStock: 8,
      maxStock: 40,
      unitPrice: 2299.99,
      costPrice: 1799.99,
      lastEntry: '2024-01-12',
      lastExit: '2024-01-14',
      status: 'normal'
    },
  ]);

  const [stockMovements, setStockMovements] = useState([
    {
      id: 1,
      productName: 'iPhone 15 Pro Max 256GB',
      type: 'entrada',
      quantity: 10,
      date: '2024-01-15 09:30',
      user: 'Admin',
      reason: 'Compra fornecedor'
    },
    {
      id: 2,
      productName: 'iPhone 14 128GB',
      type: 'saida',
      quantity: 2,
      date: '2024-01-15 14:20',
      user: 'Maria Santos (Vendedor)',
      reason: 'Venda #V001'
    },
  ]);

  const handleStockEntry = (product: any) => {
    setSelectedProduct(product);
    setMovementType('entrada');
    setShowMovement(true);
  };

  const handleStockExit = (product: any) => {
    setSelectedProduct(product);
    setMovementType('saida');
    setShowMovement(true);
  };

  const handleMovementConfirm = (product: any, quantity: number, reason: string) => {
    const newMovement = {
      id: stockMovements.length + 1,
      productName: product.name,
      type: movementType,
      quantity,
      date: new Date().toLocaleString('pt-BR'),
      user: 'Admin',
      reason
    };

    setStockMovements(prev => [newMovement, ...prev]);

    setStockData(prev => prev.map(item => {
      if (item.id === product.id) {
        const newStock = movementType === 'entrada' 
          ? item.currentStock + quantity 
          : item.currentStock - quantity;
        
        const newStatus = newStock === 0 ? 'out' : 
                         newStock <= item.minStock ? 'low' : 'normal';

        return {
          ...item,
          currentStock: newStock,
          status: newStatus,
          [movementType === 'entrada' ? 'lastEntry' : 'lastExit']: new Date().toISOString().split('T')[0]
        };
      }
      return item;
    }));
  };

  const handleInventory = () => {
    setShowInventory(true);
    toast({
      title: "Inventário Geral",
      description: "Processo de inventário completo iniciado.",
    });
  };

  const handleEditProduct = (product: any) => {
    toast({
      title: "Editar Produto",
      description: `Editando ${product.name}. Redirecionando para edição...`,
    });
  };

  const handleDeleteProduct = (product: any) => {
    if (window.confirm(`Tem certeza que deseja excluir ${product.name}?`)) {
      setStockData(prev => prev.filter(p => p.id !== product.id));
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

  if (showInventory) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Inventário Geral do Estoque</CardTitle>
            <Button onClick={() => setShowInventory(false)}>
              Voltar ao Estoque
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardContent className="pt-6 text-center">
                    <p className="text-2xl font-bold text-green-600">{stockData.filter(p => p.status === 'normal').length}</p>
                    <p className="text-sm text-muted-foreground">Produtos com Estoque Normal</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <p className="text-2xl font-bold text-yellow-600">{stockData.filter(p => p.status === 'low').length}</p>
                    <p className="text-sm text-muted-foreground">Produtos com Estoque Baixo</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <p className="text-2xl font-bold text-red-600">{stockData.filter(p => p.status === 'out').length}</p>
                    <p className="text-sm text-muted-foreground">Produtos Sem Estoque</p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-3">
                {stockData.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${
                        product.currentStock <= product.minStock ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {product.currentStock} unidades
                      </p>
                      <Badge variant={getStatusColor(product.status)}>
                        {getStatusText(product.status)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
                <Button variant="outline" size="sm" onClick={() => handleStockEntry(product)}>
                  <ArrowDown className="h-4 w-4 mr-1 text-green-600" />
                  Entrada
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleStockExit(product)}>
                  <ArrowUp className="h-4 w-4 mr-1 text-red-600" />
                  Saída
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleEditProduct(product)}>
                  <Edit className="h-4 w-4 mr-1" />
                  Editar
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDeleteProduct(product)}>
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

      {showMovement && selectedProduct && (
        <StockMovement
          product={selectedProduct}
          type={movementType}
          onClose={() => setShowMovement(false)}
          onConfirm={handleMovementConfirm}
        />
      )}
    </div>
  );
};

export default Stock;
