
import React, { useState } from 'react';
import { Package, Plus, Edit, Trash2, AlertTriangle, Search, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const Inventory = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  const inventory = [
    {
      id: 1,
      name: 'iPhone 15 Pro Max 256GB',
      category: 'Smartphones',
      stock: 15,
      minStock: 10,
      unitPrice: 7999.99,
      active: true
    },
    {
      id: 2,
      name: 'iPhone 14 128GB',
      category: 'Smartphones',
      stock: 8,
      minStock: 5,
      unitPrice: 4999.99,
      active: true
    },
    {
      id: 3,
      name: 'iPhone 13 128GB',
      category: 'Smartphones',
      stock: 12,
      minStock: 8,
      unitPrice: 3799.99,
      active: true
    },
    {
      id: 4,
      name: 'iPhone SE 64GB',
      category: 'Smartphones',
      stock: 6,
      minStock: 5,
      unitPrice: 2299.99,
      active: true
    },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [products, setProducts] = useState(inventory);

  const handleNewProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = (product: any) => {
    if (window.confirm(`Tem certeza que deseja excluir ${product.name}?`)) {
      setProducts(prev => prev.filter(p => p.id !== product.id));
      toast({
        title: "Produto excluído",
        description: `${product.name} foi removido com sucesso.`
      });
    }
  };

  const handleSaveProduct = (productData: any) => {
    if (editingProduct) {
      setProducts(prev => prev.map(p => 
        p.id === editingProduct.id ? { ...p, ...productData } : p
      ));
    } else {
      const newProduct = {
        ...productData,
        id: Date.now(),
      };
      setProducts(prev => [...prev, newProduct]);
    }
    setShowForm(false);
    setEditingProduct(null);
    toast({
      title: editingProduct ? "Produto atualizado" : "Produto criado",
      description: `${productData.name} foi ${editingProduct ? 'atualizado' : 'criado'} com sucesso.`
    });
  };

  const filteredInventory = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (showForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {editingProduct ? 'Editar Produto' : 'Novo Produto'}
            </h1>
            <p className="text-muted-foreground">
              {editingProduct ? 'Atualize as informações do produto' : 'Cadastre um novo produto no estoque'}
            </p>
          </div>
          <Button variant="outline" onClick={() => setShowForm(false)}>
            <X className="mr-2 h-4 w-4" />
            Cancelar
          </Button>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Nome do Produto</label>
                  <Input 
                    defaultValue={editingProduct?.name || ''}
                    placeholder="Digite o nome do produto"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Categoria</label>
                  <Input 
                    defaultValue={editingProduct?.category || ''}
                    placeholder="Digite a categoria"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Estoque Atual</label>
                  <Input 
                    type="number"
                    defaultValue={editingProduct?.stock || ''}
                    placeholder="Quantidade em estoque"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Estoque Mínimo</label>
                  <Input 
                    type="number"
                    defaultValue={editingProduct?.minStock || ''}
                    placeholder="Estoque mínimo"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Preço Unitário</label>
                  <Input 
                    type="number"
                    step="0.01"
                    defaultValue={editingProduct?.unitPrice || ''}
                    placeholder="Preço do produto"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowForm(false)}>
                  Cancelar
                </Button>
                <Button onClick={() => handleSaveProduct({
                  name: 'Produto Exemplo',
                  category: 'Categoria',
                  stock: 10,
                  minStock: 5,
                  unitPrice: 29.90,
                  active: true
                })}>
                  {editingProduct ? 'Atualizar' : 'Salvar'} Produto
                </Button>
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
          <h1 className="text-3xl font-bold text-foreground">Estoque</h1>
          <p className="text-muted-foreground">Controle de produtos e estoque</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Input 
              placeholder="Buscar produtos..." 
              className="w-64 pr-10" 
              value={searchTerm}
              onChange={handleSearch}
            />
            {searchTerm ? (
              <Button 
                variant="ghost" 
                size="sm" 
                className="absolute right-0 top-0 h-full px-3"
                onClick={clearSearch}
              >
                <X className="h-4 w-4" />
              </Button>
            ) : (
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            )}
          </div>
          <Button onClick={handleNewProduct}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Produto
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredInventory.map((product) => (
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
                  <Button variant="outline" size="sm" onClick={() => handleEditProduct(product)}>
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDeleteProduct(product)}>
                    <Trash2 className="h-4 w-4 mr-1" />
                    Excluir
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredInventory.length === 0 && searchTerm && (
        <div className="text-center py-8">
          <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Nenhum produto encontrado para "{searchTerm}"</p>
          <Button variant="outline" onClick={clearSearch} className="mt-2">
            Limpar busca
          </Button>
        </div>
      )}
    </div>
  );
};

export default Inventory;
