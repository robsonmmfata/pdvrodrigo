
import React from 'react';
import { Plus, Package, AlertTriangle, Eye, Edit } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const Products = () => {
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gerenciar Produtos</h1>
          <p className="text-muted-foreground">Administre todos os produtos e estoque</p>
        </div>
        <Button>
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
                  <Badge variant={product.active ? "default" : "secondary"}>
                    {product.active ? "Ativo" : "Inativo"}
                  </Badge>
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

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="mr-1 h-3 w-3" />
                    Ver
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="mr-1 h-3 w-3" />
                    Editar
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
