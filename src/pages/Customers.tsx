
import React from 'react';
import { Plus, User, Phone, Calendar, Award, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Customers = () => {
  const customers = [
    { 
      id: '1', 
      name: 'Ana Oliveira', 
      whatsapp: '11999887766', 
      cpf: '123.456.789-01',
      birthDate: '15/03/1985',
      loyaltyPoints: 1250,
      credits: 45.50,
      totalPurchases: 12,
      lastPurchase: '2024-01-15'
    },
    { 
      id: '2', 
      name: 'Carlos Mendes', 
      whatsapp: '11888776655', 
      cpf: '987.654.321-09',
      birthDate: '22/07/1990',
      loyaltyPoints: 850,
      credits: 0,
      totalPurchases: 8,
      lastPurchase: '2024-01-10'
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
      lastPurchase: '2024-01-08'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gerenciar Clientes</h1>
          <p className="text-muted-foreground">Administre todos os clientes da loja</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Cliente
        </Button>
      </div>

      <div className="grid gap-6">
        {customers.map((customer) => (
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
                      <span className="text-sm text-muted-foreground">{customer.whatsapp}</span>
                    </div>
                    {customer.cpf && (
                      <div className="text-sm text-muted-foreground">CPF: {customer.cpf}</div>
                    )}
                    {customer.birthDate && (
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{customer.birthDate}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                  <div className="text-sm font-medium">{customer.lastPurchase}</div>
                  <div className="text-sm text-muted-foreground">Última Compra</div>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  Ver Histórico
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Editar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Customers;
