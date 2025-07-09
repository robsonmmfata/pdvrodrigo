
import React from 'react';
import { Package, Plus, Edit, Trash2, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const Inventory = () => {
  const inventory = [
    {
      id: 1,
      name: 'Produto A',
      category: 'Categoria 1',
      stock: 15,
      minStock: 10,
      unitPrice: 25.90,
      active: true
    },
    {
      id: 2,
      name: 'Produto B',
      category: 'Categoria 2',
      stock: 3,
      minStock: 5,
      unitPrice: 45.50,
      active: true
    },
    {
      id: 3,
      name: 'Produto C',
      category: 'Categoria 1',
      stock: 0,
      minStock: 8,
      unitPrice: 89.90,
      active: false
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Estoque</h1>
          <p className="text-muted-foreground">Controle de produtos e estoque</p>
        </div>
        <div className="flex gap-2">
          <Input placeholder="Buscar produtos..." className="w-64" />
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Produto
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {inventory.map((product) => (
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
                <div className="flex items-center gap-2">
                  <Badge variant={product.active ? 'default' : 'secondary'}>
                    {product.active ? 'Ativo' : 'Inativo'}
                  </Badge>
                  {product.stock <= product.minStock && (
                    <Badge variant="destructive">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Estoque Baixo
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Estoque Atual</p>
                  <p className={`text-xl font-bold ${product.stock <= product.minStock ? 'text-red-600' : 'text-green-600'}`}>
                    {product.stock} unidades
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Estoque Mínimo</p>
                  <p className="font-medium">{product.minStock} unidades</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Preço Unitário</p>
                  <p className="font-medium">
                    R$ {product.unitPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4 mr-1" />
                    Excluir
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Inventory;
