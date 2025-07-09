
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Search, MessageCircle, CreditCard } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface SaleItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface Customer {
  id: string;
  name: string;
  whatsapp: string;
  loyaltyPoints: number;
  storeCredit: number;
}

export const NewSale = () => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [customerSearch, setCustomerSearch] = useState('');
  const [items, setItems] = useState<SaleItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cashReceived, setCashReceived] = useState('');
  const [leaveChangeAsCredit, setLeaveChangeAsCredit] = useState(false);

  // Mock data
  const mockCustomers: Customer[] = [
    { id: '1', name: 'João Silva', whatsapp: '11999999999', loyaltyPoints: 150, storeCredit: 25.50 },
    { id: '2', name: 'Maria Santos', whatsapp: '11888888888', loyaltyPoints: 87, storeCredit: 0 },
  ];

  const mockProducts = [
    { id: '1', name: 'Produto A', price: 25.90, stock: 50 },
    { id: '2', name: 'Produto B', price: 15.00, stock: 30 },
    { id: '3', name: 'Produto C', price: 45.50, stock: 20 },
  ];

  const searchCustomer = () => {
    const found = mockCustomers.find(c => 
      c.whatsapp.includes(customerSearch) || 
      c.name.toLowerCase().includes(customerSearch.toLowerCase())
    );
    if (found) {
      setCustomer(found);
      toast({ title: "Cliente encontrado!", description: `${found.name} selecionado.` });
    } else {
      toast({ 
        title: "Cliente não encontrado", 
        description: "Deseja cadastrar um novo cliente?",
        variant: "destructive"
      });
    }
  };

  const addItem = () => {
    const newItem: SaleItem = {
      id: Date.now().toString(),
      name: '',
      quantity: 1,
      unitPrice: 0,
      total: 0,
    };
    setItems([...items, newItem]);
  };

  const updateItem = (id: string, field: keyof SaleItem, value: any) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        if (field === 'quantity' || field === 'unitPrice') {
          updated.total = updated.quantity * updated.unitPrice;
        }
        return updated;
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const getTotalSale = () => {
    return items.reduce((sum, item) => sum + item.total, 0);
  };

  const getChange = () => {
    if (paymentMethod === 'cash' && cashReceived) {
      return Math.max(0, parseFloat(cashReceived) - getTotalSale());
    }
    return 0;
  };

  const finalizeSale = () => {
    if (!customer) {
      toast({ title: "Erro", description: "Selecione um cliente.", variant: "destructive" });
      return;
    }

    if (items.length === 0) {
      toast({ title: "Erro", description: "Adicione pelo menos um produto.", variant: "destructive" });
      return;
    }

    if (!paymentMethod) {
      toast({ title: "Erro", description: "Selecione a forma de pagamento.", variant: "destructive" });
      return;
    }

    // Simular finalização da venda
    const saleData = {
      customer,
      items,
      paymentMethod,
      total: getTotalSale(),
      loyaltyPointsEarned: Math.floor(getTotalSale() * 0.01),
      change: getChange(),
      leaveChangeAsCredit,
    };

    console.log('Venda finalizada:', saleData);
    
    toast({ 
      title: "Venda finalizada!", 
      description: `Total: R$ ${getTotalSale().toFixed(2)}. Mensagem enviada para ${customer.whatsapp}` 
    });

    // Reset form
    setCustomer(null);
    setCustomerSearch('');
    setItems([]);
    setPaymentMethod('');
    setCashReceived('');
    setLeaveChangeAsCredit(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Nova Venda</h1>
        <p className="text-gray-600 mt-1">Registre uma nova venda para seu cliente</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Seleção do Cliente */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Cliente</CardTitle>
            <CardDescription>Busque por WhatsApp ou nome</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="WhatsApp ou nome do cliente"
                value={customerSearch}
                onChange={(e) => setCustomerSearch(e.target.value)}
                className="flex-1"
              />
              <Button onClick={searchCustomer} variant="outline">
                <Search className="h-4 w-4" />
              </Button>
            </div>

            {customer && (
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-green-900">{customer.name}</h3>
                    <p className="text-green-700">{customer.whatsapp}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary">{customer.loyaltyPoints} pontos</Badge>
                    {customer.storeCredit > 0 && (
                      <p className="text-sm text-green-600 mt-1">
                        R$ {customer.storeCredit.toFixed(2)} em crédito
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            <Button variant="outline" className="w-full">
              + Cadastrar Novo Cliente
            </Button>
          </CardContent>
        </Card>

        {/* Resumo da Venda */}
        <Card>
          <CardHeader>
            <CardTitle>Resumo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>R$ {getTotalSale().toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total:</span>
                <span>R$ {getTotalSale().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-green-600">
                <span>Pontos ganhos:</span>
                <span>{Math.floor(getTotalSale() * 0.01)} pontos</span>
              </div>
            </div>

            {paymentMethod === 'cash' && cashReceived && getChange() > 0 && (
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex justify-between">
                  <span>Troco:</span>
                  <span className="font-semibold">R$ {getChange().toFixed(2)}</span>
                </div>
                <div className="mt-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={leaveChangeAsCredit}
                      onChange={(e) => setLeaveChangeAsCredit(e.target.checked)}
                    />
                    Deixar troco como crédito
                  </label>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Produtos */}
      <Card>
        <CardHeader>
          <CardTitle>Produtos</CardTitle>
          <CardDescription>Adicione os produtos da venda</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 border rounded-lg">
              <div className="md:col-span-2">
                <Label>Produto</Label>
                <Select onValueChange={(value) => {
                  const product = mockProducts.find(p => p.id === value);
                  if (product) {
                    updateItem(item.id, 'name', product.name);
                    updateItem(item.id, 'unitPrice', product.price);
                  }
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o produto" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockProducts.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name} - R$ {product.price.toFixed(2)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Quantidade</Label>
                <Input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                />
              </div>

              <div>
                <Label>Preço Unit.</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={item.unitPrice}
                  onChange={(e) => updateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                />
              </div>

              <div>
                <Label>Total</Label>
                <Input
                  value={`R$ ${item.total.toFixed(2)}`}
                  disabled
                />
              </div>

              <div className="flex items-end">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => removeItem(item.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}

          <Button onClick={addItem} variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Produto
          </Button>
        </CardContent>
      </Card>

      {/* Pagamento */}
      <Card>
        <CardHeader>
          <CardTitle>Pagamento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Forma de Pagamento</Label>
              <Select onValueChange={setPaymentMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Dinheiro</SelectItem>
                  <SelectItem value="pix">PIX</SelectItem>
                  <SelectItem value="card">Cartão</SelectItem>
                  <SelectItem value="store_credit">Crédito da Loja</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {paymentMethod === 'cash' && (
              <div>
                <Label>Valor Recebido</Label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="R$ 0,00"
                  value={cashReceived}
                  onChange={(e) => setCashReceived(e.target.value)}
                />
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <Button onClick={finalizeSale} className="flex-1">
              <CreditCard className="h-4 w-4 mr-2" />
              Finalizar Venda
            </Button>
            <Button variant="outline">
              <MessageCircle className="h-4 w-4 mr-2" />
              Enviar WhatsApp
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewSale;
