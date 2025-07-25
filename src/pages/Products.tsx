import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ProductForm } from '@/components/forms/ProductForm';
import { ProductDetails } from '@/components/ProductDetails';

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
}

const Products = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'iPhone 15 Pro Max 256GB',
      category: 'Smartphones',
      price: 7999.99,
      stock: 15,
      minStock: 5,
      description: 'iPhone 15 Pro Max 256GB - Titânio Natural com Chip A17 Pro',
      active: true,
      sales: 23
    },
    {
      id: '2',
      name: 'iPhone 14 128GB',
      category: 'Smartphones',
      price: 4999.99,
      stock: 8,
      minStock: 10,
      description: 'iPhone 14 128GB - Azul com Chip A15 Bionic',
      active: true,
      sales: 12
    },
    {
      id: '3',
      name: 'iPhone 13 128GB',
      category: 'Smartphones',
      price: 3799.99,
      stock: 12,
      minStock: 8,
      description: 'iPhone 13 128GB - Rosa com Chip A15 Bionic',
      active: true,
      sales: 18
    },
    {
      id: '4',
      name: 'iPhone SE 64GB',
      category: 'Smartphones',
      price: 2299.99,
      stock: 6,
      minStock: 5,
      description: 'iPhone SE 3ª geração 64GB - Meia-noite com Chip A15 Bionic',
      active: true,
      sales: 9
    }
  ]);

  const categories = ['all', 'Smartphones', 'Acessórios', 'Eletrônicos'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleNewProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = (product: Product) => {
    if (window.confirm(`Tem certeza que deseja excluir o produto "${product.name}"?`)) {
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
        p.id === editingProduct.id 
          ? { ...p, ...productData }
          : p
      ));
    } else {
      const newProduct: Product = {
        ...productData,
        id: Date.now().toString(),
        sales: 0
      };
      setProducts(prev => [...prev, newProduct]);
    }
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setShowDetails(true);
  };

  const getStockStatus = (product: Product) => {
    if (product.stock === 0) return { label: 'Sem Estoque', color: 'destructive' as const };
    if (product.stock <= product.minStock) return { label: 'Estoque Baixo', color: 'secondary' as const };
    return { label: 'Em Estoque', color: 'default' as const };
  };

  if (showForm) {
    return (
      <div className="space-y-6">
        <ProductForm
          product={editingProduct || undefined}
          onSave={handleSaveProduct}
          onCancel={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
        />
      </div>
    );
  }

  if (showDetails && selectedProduct) {
    return (
      <div className="space-y-6">
        <ProductDetails
          product={selectedProduct}
          onClose={() => {
            setShowDetails(false);
            setSelectedProduct(null);
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Produtos</h1>
          <p className="text-muted-foreground">Gerencie o catálogo de produtos da loja</p>
        </div>
        <Button onClick={handleNewProduct}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Produto
        </Button>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar produtos..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filtrar por categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as categorias</SelectItem>
                {categories.slice(1).map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Produtos */}
      <div className="grid gap-4">
        {filteredProducts.map((product) => {
          const stockStatus = getStockStatus(product);
          
          return (
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
                    <Badge variant={stockStatus.color}>
                      {stockStatus.label}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Preço</p>
                    <p className="text-xl font-bold text-green-600">
                      R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Estoque</p>
                    <p className={`font-medium ${product.stock <= product.minStock ? 'text-red-600' : 'text-green-600'}`}>
                      {product.stock} unidades
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Vendas</p>
                    <p className="font-medium">{product.sales} vendidas</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Descrição</p>
                    <p className="font-medium text-sm">{product.description}</p>
                  </div>
                   <div className="flex flex-col gap-2">
                     <div className="flex gap-2">
                       <Button variant="outline" size="sm" onClick={() => handleViewDetails(product)}>
                         <Eye className="h-4 w-4 mr-1" />
                         Ver
                       </Button>
                       <Button variant="outline" size="sm" onClick={() => handleEditProduct(product)}>
                         <Edit className="h-4 w-4 mr-1" />
                         Editar
                       </Button>
                     </div>
                     <Button variant="outline" size="sm" onClick={() => handleDeleteProduct(product)}>
                       <Trash2 className="h-4 w-4 mr-1" />
                       Excluir
                     </Button>
                   </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-8">
          <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            {searchTerm || categoryFilter !== 'all' 
              ? 'Nenhum produto encontrado com os filtros aplicados'
              : 'Nenhum produto cadastrado ainda'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default Products;
