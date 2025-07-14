
import React, { useState } from 'react';
import { CreditCard, User, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const Credits = () => {
  const { toast } = useToast();
  const [credits, setCredits] = useState([
    {
      id: 'C001',
      customer: 'João Silva',
      amount: 25.50,
      origin: 'Troco Venda V001',
      status: 'Pendente',
      date: '2024-01-15 14:30',
      used: false
    },
    {
      id: 'C002',
      customer: 'Ana Costa',
      amount: 15.00,
      origin: 'Troco Venda V002',
      status: 'Aprovado',
      date: '2024-01-14 16:20',
      used: false
    },
    {
      id: 'C003',
      customer: 'Carlos Oliveira',
      amount: 30.00,
      origin: 'Troco Venda V003',
      status: 'Usado',
      date: '2024-01-13 10:15',
      used: true
    },
  ]);

  const handleApprove = (creditId: string) => {
    setCredits(credits.map(credit => 
      credit.id === creditId ? { ...credit, status: 'Aprovado' } : credit
    ));
    toast({
      title: "Crédito Aprovado",
      description: `Crédito ${creditId} foi aprovado com sucesso!`,
    });
  };

  const handleReject = (creditId: string) => {
    setCredits(credits.filter(credit => credit.id !== creditId));
    toast({
      title: "Crédito Rejeitado",
      description: `Crédito ${creditId} foi rejeitado.`,
      variant: "destructive"
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pendente': return 'secondary';
      case 'Aprovado': return 'default';
      case 'Usado': return 'outline';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pendente': return <Clock className="h-4 w-4" />;
      case 'Aprovado': return <CheckCircle className="h-4 w-4" />;
      case 'Usado': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Créditos em Loja</h1>
          <p className="text-muted-foreground">Gerenciar créditos de clientes</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Pendente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">R$ 25,50</div>
            <p className="text-xs text-muted-foreground">1 solicitação</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Aprovado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">R$ 15,00</div>
            <p className="text-xs text-muted-foreground">1 crédito disponível</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Usado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">R$ 30,00</div>
            <p className="text-xs text-muted-foreground">1 crédito utilizado</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4">
        {credits.map((credit) => (
          <Card key={credit.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Crédito {credit.id}</CardTitle>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {credit.customer}
                    </p>
                  </div>
                </div>
                <Badge variant={getStatusColor(credit.status)} className="flex items-center gap-1">
                  {getStatusIcon(credit.status)}
                  {credit.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Valor</p>
                  <p className="text-xl font-bold text-green-600">
                    R$ {credit.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Origem</p>
                  <p className="font-medium">{credit.origin}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Data</p>
                  <p className="font-medium">{credit.date}</p>
                </div>
              </div>
              {credit.status === 'Pendente' && (
                <div className="flex gap-2 mt-4">
                  <Button size="sm" variant="default" onClick={() => handleApprove(credit.id)}>
                    Aprovar
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleReject(credit.id)}>
                    Rejeitar
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Credits;
