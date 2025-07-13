
import React from 'react';
import { Plus, Package, AlertTriangle, Eye, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

const Products = () => {
  const { toast } = useToast();

  const products = [
    { 
      id: '1', 
      name: 'Smartphone Galaxy A54', 
      category: 'Eletrônicos',
      price: 1299.90,
      stock: 25,
      minStock: 5,
      active: true,
      sales: 18
    },
    { 
      id: '2', 
      name: 'Tênis Nike Air Max', 
      category: 'Calçados',
      price: 599.90,
      stock: 3,
      minStock: 10,
      active: true,
      sales: 12
    },
    { 
      id: '3', 
      name: 'Fone Bluetooth JBL', 
      category: 'Eletrônicos',
      price: 199.90,
      stock: 0,
      minStock: 5,
      active: false,
      sales: 8
    },
  ];

  const getStockStatus = (stock: number, minStock: number) => {
    if (stock === 0) return { color: 'text-red-600', label: 'Sem Estoque', variant: 'destructive' as const };
    if (stock <= minStock) return { color: 'text-yellow-600', label: 'Estoque Baixo', variant: 'secondary' as const };
    return { color: 'text-green-600', label: 'Em Estoque', variant: 'default' as const };
  };

  const handleNewProduct = () => {
    toast({
      title: "Novo Produto",
      description: "Abrindo formulário para cadastrar novo produto...",
    });
  };

  const handleViewProduct = (product: any) => {
    toast({
      title: "Visualizar Produto",
      description: `Visualizando detalhes de ${product.name}`,
    });
  };

  const handleEditProduct = (product: any) => {
    toast({
      title: "Editar Produto",
      description: `Editando ${product.name}...`,
    });
  };

  const handleDeleteProduct = (product: any) => {
    toast({
      title: "Confirmar Exclusão",
      description: `Tem certeza que deseja excluir ${product.name}?`,
      variant: "destructive"
    });
  };

  const handleApproveProduct = (product: any) => {
    toast({
      title: "Produto Aprovado",
      description: `${product.name} foi aprovado e está ativo!`,
    });
  };

  const handleToggleStatus = (product: any) => {
    const newStatus = product.active ? 'inativo' : 'ativo';
    toast({
      title: "Status Alterado",
      description: `${product.name} agora está ${newStatus}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gerenciar Produtos</h1>
          <p className="text-muted-foreground">Administre todos os produtos e estoque</p>
        </div>
        <Button onClick={handleNewProduct}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Produto
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => {
          const stockStatus = getStockStatus(product.stock, product.minStock);
          const stockPercentage = Math.min((product.stock / (product.minStock * 2)) * 100, 100);
          
          return (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-medium line-clamp-2">
                      {product.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{product.category}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Badge variant={product.active ? "default" : "secondary"}>
                      {product.active ? "Ativo" : "Inativo"}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleStatus(product)}
                      className="text-xs"
                    >
                      {product.active ? "Desativar" : "Ativar"}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">
                    R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Estoque</span>
                    <span className={`text-sm font-medium ${stockStatus.color}`}>
                      {product.stock} unidades
                    </span>
                  </div>
                  <Progress value={stockPercentage} className="h-2" />
                  <div className="flex items-center gap-2">
                    {product.stock <= product.minStock && (
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    )}
                    <Badge variant={stockStatus.variant} className="text-xs">
                      {stockStatus.label}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Vendas (mês)</span>
                  <span className="font-medium">{product.sales}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Button variant="outline" size="sm" onClick={() => handleViewProduct(product)}>
                    <Eye className="mr-1 h-3 w-3" />
                    Ver
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleEditProduct(product)}>
                    <Edit className="mr-1 h-3 w-3" />
                    Editar
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {!product.active && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleApproveProduct(product)}
                      className="text-green-600 hover:text-green-700"
                    >
                      Aprovar
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDeleteProduct(product)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="mr-1 h-3 w-3" />
                    Excluir
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
