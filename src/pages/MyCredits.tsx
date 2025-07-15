
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, DollarSign, Calendar, CheckCircle, X, Clock } from 'lucide-react';

const MyCredits = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  const creditsData = {
    available: 127.50,
    pending: 45.30,
    used: 89.20,
    total: 262.00
  };

  const creditsHistory = [
    {
      id: 'C001',
      description: 'Troco da compra #V2451',
      amount: 15.50,
      type: 'earned',
      status: 'approved',
      date: '2024-01-15 14:30',
      approvedBy: 'Sistema Automático'
    },
    {
      id: 'C002', 
      description: 'Troco da compra #V2463',
      amount: 8.75,
      type: 'earned',
      status: 'pending',
      date: '2024-01-15 16:45',
      approvedBy: null
    },
    {
      id: 'C003',
      description: 'Usado na compra #V2470',
      amount: -25.00,
      type: 'used',
      status: 'approved',
      date: '2024-01-14 11:20',
      approvedBy: 'Vendedor João'
    },
    {
      id: 'C004',
      description: 'Troco da compra #V2458',
      amount: 12.30,
      type: 'earned',
      status: 'approved',
      date: '2024-01-14 09:15',
      approvedBy: 'Sistema Automático'
    }
  ];

  const handleUseCredits = () => {
    if (creditsData.available <= 0) {
      toast({
        title: "Sem créditos disponíveis",
        description: "Você não possui créditos para usar no momento.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Usar Créditos",
      description: `Você tem R$ ${creditsData.available.toFixed(2)} disponíveis para usar na próxima compra.`,
    });
  };

  const handleRequestCredit = () => {
    toast({
      title: "Solicitar Crédito",
      description: "Entre em contato com a loja para solicitar crédito adicional.",
    });
  };

  const handleViewDetails = (credit: any) => {
    toast({
      title: "Detalhes do Crédito",
      description: `${credit.description} - R$ ${Math.abs(credit.amount).toFixed(2)} (${credit.status})`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'default';
      case 'pending': return 'secondary';
      case 'rejected': return 'destructive';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved': return 'Aprovado';
      case 'pending': return 'Pendente';
      case 'rejected': return 'Rejeitado';
      default: return status;
    }
  };

  const filteredHistory = creditsHistory.filter(credit => 
    credit.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    credit.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Meus Créditos</h1>
        <p className="text-muted-foreground">Acompanhe seus créditos de loja</p>
      </div>

      {/* Resumo de Créditos */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-green-500" />
              Disponível
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              R$ {creditsData.available.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">Pronto para usar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4 text-yellow-500" />
              Pendente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              R$ {creditsData.pending.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">Aguardando aprovação</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-blue-500" />
              Usado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              R$ {creditsData.used.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">Total utilizado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              R$ {creditsData.total.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">Créditos acumulados</p>
          </CardContent>
        </Card>
      </div>

      {/* Ações de Crédito */}
      <Card>
        <CardHeader>
          <CardTitle>Ações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button onClick={handleUseCredits} className="flex-1">
              <CreditCard className="mr-2 h-4 w-4" />
              Usar Créditos
            </Button>
            <Button variant="outline" onClick={handleRequestCredit} className="flex-1">
              <DollarSign className="mr-2 h-4 w-4" />
              Solicitar Crédito
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Histórico de Créditos */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Histórico de Créditos</CardTitle>
            <div className="relative w-64">
              <Input
                placeholder="Buscar transações..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-3"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredHistory.map((credit) => (
              <div 
                key={credit.id} 
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => handleViewDetails(credit)}
              >
                <div className="flex items-center gap-4">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                    credit.type === 'earned' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {credit.type === 'earned' ? (
                      <CreditCard className="h-5 w-5 text-green-600" />
                    ) : (
                      <DollarSign className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{credit.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={getStatusColor(credit.status)}>
                        {getStatusText(credit.status)}
                      </Badge>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {credit.date}
                      </span>
                    </div>
                    {credit.approvedBy && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Aprovado por: {credit.approvedBy}
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold ${
                    credit.amount > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {credit.amount > 0 ? '+' : ''}R$ {Math.abs(credit.amount).toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground">ID: {credit.id}</p>
                </div>
              </div>
            ))}
          </div>

          {filteredHistory.length === 0 && (
            <div className="text-center py-8">
              <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {searchTerm 
                  ? 'Nenhuma transação encontrada'
                  : 'Nenhuma transação de crédito ainda'
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MyCredits;
