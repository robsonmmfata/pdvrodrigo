
import React, { useState } from 'react';
import { Plus, Store, Users, ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import StoreForm from '@/components/forms/StoreForm';

const Stores = () => {
  const { toast } = useToast();
  const [stores, setStores] = useState([
    { id: '1', name: 'Loja Centro', active: true, sellers: 3, sales: 125, revenue: 15420.50 },
    { id: '2', name: 'Loja Shopping', active: true, sellers: 5, sales: 289, revenue: 32180.75 },
    { id: '3', name: 'Loja Online', active: false, sellers: 2, sales: 67, revenue: 8950.00 },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [editingStore, setEditingStore] = useState(null);

  const handleNewStore = () => {
    setEditingStore(null);
    setShowForm(true);
  };

  const handleEditStore = (store: any) => {
    setEditingStore(store);
    setShowForm(true);
  };

  const handleSaveStore = (storeData: any) => {
    if (editingStore) {
      setStores(stores.map(store => 
        store.id === editingStore.id ? { ...store, ...storeData } : store
      ));
    } else {
      setStores([...stores, storeData]);
    }
    setShowForm(false);
    setEditingStore(null);
  };

  const handleViewReports = (store: any) => {
    toast({
      title: "Relatórios da Loja",
      description: `Visualizando relatórios de ${store.name}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gerenciar Lojas</h1>
          <p className="text-muted-foreground">Administre todas as lojas do sistema</p>
        </div>
        <Button onClick={handleNewStore}>
          <Plus className="mr-2 h-4 w-4" />
          Nova Loja
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stores.map((store) => (
          <Card key={store.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Store className="h-5 w-5" />
                {store.name}
              </CardTitle>
              <Badge variant={store.active ? "default" : "secondary"}>
                {store.active ? "Ativa" : "Inativa"}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    Vendedores
                  </span>
                  <span className="font-medium">{store.sellers}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <ShoppingCart className="h-4 w-4" />
                    Vendas (mês)
                  </span>
                  <span className="font-medium">{store.sales}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Faturamento</span>
                  <span className="font-medium text-green-600">
                    R$ {store.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEditStore(store)}>
                    Editar
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => handleViewReports(store)}>
                    Relatórios
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {showForm && (
        <StoreForm
          store={editingStore}
          onSave={handleSaveStore}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default Stores;
