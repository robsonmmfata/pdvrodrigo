
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Package, Star, TrendingUp } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  minStock: number;
  description: string;
  active: boolean;
  sales: number;
  image?: string;
}

interface ProductDetailsProps {
  product: Product;
  onClose: () => void;
}

export const ProductDetails = ({ product, onClose }: ProductDetailsProps) => {
  const getStockStatus = () => {
    if (product.stock === 0) return { label: 'Sem Estoque', color: 'destructive' as const };
    if (product.stock <= product.minStock) return { label: 'Estoque Baixo', color: 'secondary' as const };
    return { label: 'Em Estoque', color: 'default' as const };
  };

  const stockStatus = getStockStatus();

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Detalhes do Produto
        </CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          {product.image && (
            <div className="w-full md:w-1/3">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg border"
              />
            </div>
          )}
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-2xl font-bold">{product.name}</h3>
              <p className="text-muted-foreground">{product.category}</p>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant={product.active ? 'default' : 'secondary'}>
                {product.active ? 'Ativo' : 'Inativo'}
              </Badge>
              <Badge variant={stockStatus.color}>
                {stockStatus.label}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Preço</p>
                <p className="text-2xl font-bold text-green-600">
                  R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Estoque</p>
                <p className={`text-xl font-bold ${product.stock <= product.minStock ? 'text-red-600' : 'text-green-600'}`}>
                  {product.stock} unidades
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Estoque Mínimo</p>
                <p className="font-medium">{product.minStock} unidades</p>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Vendas</p>
                  <p className="font-medium">{product.sales} vendidas</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {product.description && (
          <div>
            <h4 className="font-semibold mb-2">Descrição</h4>
            <p className="text-muted-foreground">{product.description}</p>
          </div>
        )}

        <div className="border-t pt-4">
          <h4 className="font-semibold mb-2">Informações Adicionais</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">ID do Produto</p>
              <p className="font-mono">{product.id}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Status</p>
              <p>{product.active ? 'Produto Ativo' : 'Produto Inativo'}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
