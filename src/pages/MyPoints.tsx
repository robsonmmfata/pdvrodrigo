
import React from 'react';
import { Award, Gift, History, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const MyPoints = () => {
  const pointsBalance = 1250;
  const pointsValue = pointsBalance * 0.01; // 1% do valor

  const pointsHistory = [
    {
      id: 1,
      description: 'Compra - Venda #V001',
      points: 150,
      date: '2024-01-15',
      type: 'earned'
    },
    {
      id: 2,
      description: 'Compra - Venda #V002',
      points: 89,
      date: '2024-01-14',
      type: 'earned'
    },
    {
      id: 3,
      description: 'Resgate - Desconto',
      points: -200,
      date: '2024-01-13',
      type: 'redeemed'
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Meus Pontos</h1>
        <p className="text-muted-foreground">Acompanhe seus pontos de fidelidade</p>
      </div>

      {/* Saldo de Pontos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-500" />
              Saldo de Pontos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">{pointsBalance}</div>
            <p className="text-sm text-muted-foreground">
              Equivale a R$ {pointsValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-green-500" />
              Próxima Recompensa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">1.500 pontos</div>
            <p className="text-sm text-muted-foreground">Faltam 250 pontos</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-green-500 h-2 rounded-full" 
                style={{ width: `${(pointsBalance / 1500) * 100}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ações */}
      <Card>
        <CardHeader>
          <CardTitle>Resgatar Pontos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button className="flex-1">
              <Gift className="mr-2 h-4 w-4" />
              Resgatar Desconto
            </Button>
            <Button variant="outline" className="flex-1">
              <Star className="mr-2 h-4 w-4" />
              Ver Recompensas
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Histórico */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Histórico de Pontos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pointsHistory.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">{item.description}</p>
                  <p className="text-sm text-muted-foreground">{item.date}</p>
                </div>
                <div className="text-right">
                  <Badge variant={item.type === 'earned' ? 'default' : 'secondary'}>
                    {item.type === 'earned' ? '+' : ''}{item.points} pts
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyPoints;
