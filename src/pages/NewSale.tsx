import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Search, MessageCircle, CreditCard } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { NewCustomerModal } from '@/components/NewCustomerModal';

interface SaleItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
  productId: string;
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
  const [showNewCustomerModal, setShowNewCustomerModal] = useState(false);
  const [allCustomers, setAllCustomers] = useState<Customer[]>([
    { id: '1', name: 'João Silva', whatsapp: '11999999999', loyaltyPoints: 150, storeCredit: 25.50 },
    { id: '2', name: 'Maria Santos', whatsapp: '11888888888', loyaltyPoints: 87, storeCredit: 0 },
    { id: '3', name: 'Ana Oliveira', whatsapp: '11999887766', loyaltyPoints: 1250, storeCredit: 45.50 },
    { id: '4', name: 'Carlos Mendes', whatsapp: '11888776655', loyaltyPoints: 850, storeCredit: 0 },
    { id: '5', name: 'Fernanda Lima', whatsapp: '11777665544', loyaltyPoints: 320, storeCredit: 12.75 },
  ]);

  const mockProducts = [
    { id: '1', name: 'iPhone 15 Pro Max 256GB', price: 7999.99, stock: 15 },
    { id: '2', name: 'iPhone 14 128GB', price: 4999.99, stock: 8 },
    { id: '3', name: 'iPhone 13 128GB', price: 3799.99, stock: 12 },
    { id: '4', name: 'iPhone SE 64GB', price: 2299.99, stock: 6 },
  ];

  const searchCustomer = () => {
    const found = allCustomers.find(c => 
      c.whatsapp.includes(customerSearch) || 
      c.name.toLowerCase().includes(customerSearch.toLowerCase())
    );
    if (found) {
      setCustomer(found);
      toast({ title: "Cliente encontrado!", description: `${found.name} selecionado.` });
    } else {
      toast({ 
        title: "Cliente não encontrado", 
        description: "Cliente não encontrado. Deseja cadastrar um novo cliente?",
        variant: "destructive"
      });
    }
  };

  const handleNewCustomer = (newCustomer: Customer) => {
    setAllCustomers(prev => [...prev, newCustomer]);
    setCustomer(newCustomer);
  };

  const addItem = () => {
    const newItem: SaleItem = {
      id: Date.now().toString(),
      name: '',
      quantity: 1,
      unitPrice: 0,
      total: 0,
      productId: '',
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

    // Verificar estoque antes de finalizar
    const outOfStockItems = items.filter(item => {
      const product = mockProducts.find(p => p.id === item.productId);
      return !product || product.stock < item.quantity;
    });

    if (outOfStockItems.length > 0) {
      toast({ 
        title: "Estoque insuficiente!", 
        description: `Alguns produtos não têm estoque suficiente.`,
        variant: "destructive"
      });
      return;
    }

    // Simular baixa automática no estoque
    const stockMovements = items.map(item => ({
      productId: item.productId,
      productName: item.name,
      quantitySold: item.quantity,
      previousStock: mockProducts.find(p => p.id === item.productId)?.stock || 0,
      newStock: (mockProducts.find(p => p.id === item.productId)?.stock || 0) - item.quantity
    }));

    // Simular finalização da venda
    const saleData = {
      customer,
      items,
      paymentMethod,
      total: getTotalSale(),
      loyaltyPointsEarned: Math.floor(getTotalSale() * 0.01),
      change: getChange(),
      leaveChangeAsCredit,
      stockMovements
    };

    console.log('Venda finalizada com baixa automática no estoque:', saleData);
    
    toast({ 
      title: "Venda finalizada com sucesso!", 
      description: `Total: R$ ${getTotalSale().toFixed(2)}. Estoque atualizado automaticamente. WhatsApp enviado para ${customer.whatsapp}` 
    });

    // Reset form
    setCustomer(null);
    setCustomerSearch('');
    setItems([]);
    setPaymentMethod('');
    setCashReceived('');
    setLeaveChangeAsCredit(false);
  };

  const sendWhatsApp = () => {
    if (!customer) {
      toast({
        title: "Erro",
        description: "Selecione um cliente primeiro.",
        variant: "destructive"
      });
      return;
    }

    const message = `Olá ${customer.name}! Sua compra no valor de R$ ${getTotalSale().toFixed(2)} foi processada. Obrigado pela preferência!`;
    const whatsappUrl = `https://wa.me/${customer.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    toast({
      title: "WhatsApp enviado!",
      description: `Mensagem enviada para ${customer.name}`,
    });
  };

  if (showNewCustomerModal) {
    return (
      <NewCustomerModal
        onClose={() => setShowNewCustomerModal(false)}
        onSave={handleNewCustomer}
      />
    );
  }

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
                onKeyPress={(e) => e.key === 'Enter' && searchCustomer()}
              />
              <Button onClick={searchCustomer} variant="outline">
                <Search className="h-4 w-4" />
              </Button>
            </div>

            {/* Lista de sugestões */}
            {customerSearch && !customer && (
              <div className="max-h-32 overflow-y-auto border rounded-lg">
                {allCustomers
                  .filter(c => 
                    c.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
                    c.whatsapp.includes(customerSearch)
                  )
                  .slice(0, 5)
                  .map(c => (
                    <div
                      key={c.id}
                      className="p-2 hover:bg-muted cursor-pointer border-b last:border-b-0"
                      onClick={() => {
                        setCustomer(c);
                        setCustomerSearch('');
                        toast({ title: "Cliente selecionado!", description: `${c.name} foi selecionado.` });
                      }}
                    >
                      <p className="font-medium">{c.name}</p>
                      <p className="text-sm text-muted-foreground">{c.whatsapp}</p>
                    </div>
                  ))
                }
              </div>
            )}

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

            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => setShowNewCustomerModal(true)}
            >
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
          <CardDescription>Adicione os produtos da venda (baixa automática no estoque)</CardDescription>
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
                    updateItem(item.id, 'productId', product.id);
                  }
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o produto" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockProducts.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name} - R$ {product.price.toFixed(2)} (Est: {product.stock})
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
            <Button variant="outline" onClick={sendWhatsApp}>
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
