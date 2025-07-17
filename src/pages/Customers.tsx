import React, { useState } from 'react';
import { Plus, User, Phone, Calendar, Award, CreditCard, Search, Edit, Eye, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { CustomerForm } from '@/components/forms/CustomerForm';
import { CustomerHistory } from '@/components/CustomerHistory';

interface Customer {
  id: string;
  name: string;
  whatsapp: string;
  cpf: string;
  birthDate: string;
  loyaltyPoints: number;
  credits: number;
  totalPurchases: number;
  lastPurchase: string;
  totalSpent: number;
}

const Customers = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  
  const [customers, setCustomers] = useState<Customer[]>([
    { 
      id: '1', 
      name: 'Ana Oliveira', 
      whatsapp: '11999887766', 
      cpf: '123.456.789-01',
      birthDate: '1985-03-15',
      loyaltyPoints: 1250,
      credits: 45.50,
      totalPurchases: 12,
      lastPurchase: '2024-01-15',
      totalSpent: 2847.30
    },
    { 
      id: '2', 
      name: 'Carlos Mendes', 
      whatsapp: '11888776655', 
      cpf: '987.654.321-09',
      birthDate: '1990-07-22',
      loyaltyPoints: 850,
      credits: 0,
      totalPurchases: 8,
      lastPurchase: '2024-01-10',
      totalSpent: 1534.80
    },
    { 
      id: '3', 
      name: 'Fernanda Lima', 
      whatsapp: '11777665544', 
      cpf: '',
      birthDate: '',
      loyaltyPoints: 320,
      credits: 12.75,
      totalPurchases: 3,
      lastPurchase: '2024-01-08',
      totalSpent: 458.90
    },
  ]);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.whatsapp.includes(searchTerm) ||
    customer.cpf.includes(searchTerm)
  );

  const handleNewCustomer = () => {
    setEditingCustomer(null);
    setShowForm(true);
  };

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer);
    setShowForm(true);
  };

  const handleDeleteCustomer = (customer: Customer) => {
    if (window.confirm(`Tem certeza que deseja excluir o cliente "${customer.name}"?`)) {
      setCustomers(prev => prev.filter(c => c.id !== customer.id));
      toast({
        title: "Cliente excluído",
        description: `${customer.name} foi removido com sucesso.`
      });
    }
  };

  const handleSaveCustomer = (customerData: any) => {
    if (editingCustomer) {
      setCustomers(prev => prev.map(c => 
        c.id === editingCustomer.id 
          ? { ...c, ...customerData }
          : c
      ));
    } else {
      const newCustomer: Customer = {
        ...customerData,
        id: Date.now().toString(),
        loyaltyPoints: 0,
        credits: 0,
        totalPurchases: 0,
        lastPurchase: '',
        totalSpent: 0
      };
      setCustomers(prev => [...prev, newCustomer]);
    }
    setShowForm(false);
    setEditingCustomer(null);
  };

  const handleViewHistory = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowHistory(true);
  };

  const formatPhone = (phone: string) => {
    if (phone.length === 11) {
      return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return phone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  };

  const formatCPF = (cpf: string) => {
    if (!cpf) return '';
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  if (showForm) {
    return (
      <div className="space-y-6">
        <CustomerForm
          customer={editingCustomer || undefined}
          onSave={handleSaveCustomer}
          onCancel={() => {
            setShowForm(false);
            setEditingCustomer(null);
          }}
        />
      </div>
    );
  }

  if (showHistory && selectedCustomer) {
    return (
      <div className="space-y-6">
        <CustomerHistory
          customer={selectedCustomer}
          onClose={() => {
            setShowHistory(false);
            setSelectedCustomer(null);
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Clientes</h1>
          <p className="text-muted-foreground">Gerencie todos os clientes da loja</p>
        </div>
        <Button onClick={handleNewCustomer}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Cliente
        </Button>
      </div>

      {/* Busca */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, telefone ou CPF..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Lista de Clientes */}
      <div className="grid gap-6">
        {filteredCustomers.map((customer) => (
          <Card key={customer.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>
                      {customer.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{customer.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{formatPhone(customer.whatsapp)}</span>
                    </div>
                    {customer.cpf && (
                      <div className="text-sm text-muted-foreground">CPF: {formatCPF(customer.cpf)}</div>
                    )}
                    {customer.birthDate && (
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{formatDate(customer.birthDate)}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleViewHistory(customer)}>
                    <Eye className="h-4 w-4 mr-1" />
                    Histórico
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleEditCustomer(customer)}>
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDeleteCustomer(customer)}>
                    <Trash2 className="h-4 w-4 mr-1" />
                    Excluir
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-600">
                    <Award className="h-6 w-6" />
                    {customer.loyaltyPoints}
                  </div>
                  <div className="text-sm text-muted-foreground">Pontos Fidelidade</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-2xl font-bold text-green-600">
                    <CreditCard className="h-6 w-6" />
                    R$ {customer.credits.toFixed(2)}
                  </div>
                  <div className="text-sm text-muted-foreground">Créditos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{customer.totalPurchases}</div>
                  <div className="text-sm text-muted-foreground">Total Compras</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-600">
                    R$ {customer.totalSpent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Gasto</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium">{formatDate(customer.lastPurchase) || 'Nunca'}</div>
                  <div className="text-sm text-muted-foreground">Última Compra</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <div className="text-center py-8">
          <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            {searchTerm 
              ? 'Nenhum cliente encontrado com os filtros aplicados'
              : 'Nenhum cliente cadastrado ainda'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default Customers;
