
import React from 'react';
import { CreditCard, Clock, Check, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const MyCredits = () => {
  const { toast } = useToast();
  const availableCredits = 45.80;
  const pendingCredits = 12.50;

  const creditsHistory = [
    {
      id: 1,
      description: 'Troco deixado em loja',
      amount: 15.20,
      date: '2024-01-15',
      status: 'approved',
      approvedBy: 'Admin Master'
    },
    {
      id: 2,
      description: 'Troco deixado em loja',
      amount: 12.50,
      date: '2024-01-14',
      status: 'pending',
      approvedBy: null
    },
    {
      id: 3,
      description: 'Usado na compra',
      amount: -30.60,
      date: '2024-01-13',
      status: 'used',
      approvedBy: 'Admin Master'
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Meus Créditos</h1>
        <p className="text-muted-foreground">Acompanhe seus créditos em loja</p>
      </div>

      {/* Saldo de Créditos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-green-500" />
              Créditos Disponíveis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              R$ {availableCredits.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-sm text-muted-foreground">Pronto para usar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-500" />
              Créditos Pendentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              R$ {pendingCredits.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-sm text-muted-foreground">Aguardando aprovação</p>
          </CardContent>
        </Card>
      </div>

      {/* Histórico */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Créditos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {creditsHistory.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">{item.description}</p>
                  <p className="text-sm text-muted-foreground">{item.date}</p>
                  {item.approvedBy && (
                    <p className="text-xs text-muted-foreground">Por: {item.approvedBy}</p>
                  )}
                </div>
                <div className="text-right flex items-center gap-2">
                  <div>
                    <p className={`font-bold ${item.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      R$ {Math.abs(item.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  {item.status === 'approved' && (
                    <Badge variant="default">
                      <Check className="h-3 w-3 mr-1" />
                      Aprovado
                    </Badge>
                  )}
                  {item.status === 'pending' && (
                    <Badge variant="secondary">
                      <Clock className="h-3 w-3 mr-1" />
                      Pendente
                    </Badge>
                  )}
                  {item.status === 'used' && (
                    <Badge variant="outline">
                      <X className="h-3 w-3 mr-1" />
                      Usado
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyCredits;
