
import React, { useState } from 'react';
import { Award, Gift, History, Star, ShoppingCart, Check, X, Trophy, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface Reward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  type: 'discount' | 'product' | 'cashback';
  value: number;
  available: boolean;
  category: string;
}

const MyPoints = () => {
  const { toast } = useToast();
  const [pointsBalance, setPointsBalance] = useState(1783);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [redeemDialogOpen, setRedeemDialogOpen] = useState(false);
  const [rewardsDialogOpen, setRewardsDialogOpen] = useState(false);
  
  const pointsValue = pointsBalance * 0.01; // 1% do valor

  const availableRewards: Reward[] = [
    {
      id: 'R001',
      name: 'R$ 10,00 de Desconto',
      description: 'Desconto aplicável em qualquer compra',
      pointsCost: 1000,
      type: 'discount',
      value: 10.00,
      available: true,
      category: 'Desconto'
    },
    {
      id: 'R002',
      name: 'R$ 25,00 de Desconto',
      description: 'Desconto aplicável em compras acima de R$ 100,00',
      pointsCost: 2500,
      type: 'discount',
      value: 25.00,
      available: true,
      category: 'Desconto'
    },
    {
      id: 'R003',
      name: 'AirPods 3ª Geração',
      description: 'Fone de ouvido sem fio Apple AirPods 3ª geração',
      pointsCost: 15000,
      type: 'product',
      value: 299.99,
      available: true,
      category: 'Produto'
    },
    {
      id: 'R004',
      name: 'Capa iPhone Premium',
      description: 'Capa protetora premium para iPhone com proteção MagSafe',
      pointsCost: 5000,
      type: 'product',
      value: 99.99,
      available: true,
      category: 'Produto'
    },
    {
      id: 'R005',
      name: '5% Cashback',
      description: 'Receba 5% de volta na próxima compra',
      pointsCost: 3000,
      type: 'cashback',
      value: 5,
      available: true,
      category: 'Cashback'
    },
    {
      id: 'R006',
      name: 'R$ 50,00 de Desconto',
      description: 'Desconto aplicável em compras acima de R$ 300,00',
      pointsCost: 5000,
      type: 'discount',
      value: 50.00,
      available: true,
      category: 'Desconto'
    }
  ];

  const pointsHistory = [
    {
      id: 1,
      description: 'Compra iPhone 15 Pro Max - Venda #V2470',
      points: 815,
      date: '2024-01-15 14:30',
      type: 'earned',
      details: 'Ganhou 1 ponto por real gasto (R$ 8.157,80)'
    },
    {
      id: 2,
      description: 'Compra iPhone 14 - Venda #V2463',
      points: 499,
      date: '2024-01-14 11:20',
      type: 'earned',
      details: 'Ganhou 1 ponto por real gasto (R$ 4.999,99)'
    },
    {
      id: 3,
      description: 'Resgate: R$ 10,00 de Desconto',
      points: -1000,
      date: '2024-01-13 16:45',
      type: 'redeemed',
      details: 'Desconto aplicado na compra #V2458'
    },
    {
      id: 4,
      description: 'Compra iPhone 13 + AirPods - Venda #V2458',
      points: 469,
      date: '2024-01-13 16:45',
      type: 'earned',
      details: 'Ganhou 1 ponto por real gasto (R$ 4.699,97)'
    },
    {
      id: 5,
      description: 'Bônus: Cliente Fiel',
      points: 200,
      date: '2024-01-10 00:00',
      type: 'bonus',
      details: 'Bônus por ser cliente há mais de 1 ano'
    }
  ];

  const filteredRewards = availableRewards.filter(reward =>
    reward.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reward.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRedeemPoints = (reward: Reward) => {
    if (pointsBalance >= reward.pointsCost) {
      setSelectedReward(reward);
      setRedeemDialogOpen(true);
    } else {
      toast({
        title: "Pontos Insuficientes",
        description: `Você precisa de ${reward.pointsCost} pontos. Você tem ${pointsBalance} pontos.`,
        variant: "destructive"
      });
    }
  };

  const confirmRedeem = () => {
    if (selectedReward) {
      setPointsBalance(prev => prev - selectedReward.pointsCost);
      
      toast({
        title: "Resgate Realizado!",
        description: `${selectedReward.name} foi resgatado com sucesso!`,
      });
      
      setRedeemDialogOpen(false);
      setSelectedReward(null);
    }
  };

  const handleViewRewards = () => {
    setRewardsDialogOpen(true);
  };

  const handleHistoryItemClick = (item: any) => {
    toast({
      title: "Detalhes da Transação",
      description: `${item.description} - ${item.points > 0 ? '+' : ''}${item.points} pontos. ${item.details}`,
    });
  };

  const getRewardIcon = (type: string) => {
    switch (type) {
      case 'discount': return <Gift className="h-4 w-4 text-green-500" />;
      case 'product': return <ShoppingCart className="h-4 w-4 text-blue-500" />;
      case 'cashback': return <Award className="h-4 w-4 text-purple-500" />;
      default: return <Star className="h-4 w-4" />;
    }
  };

  const nextRewardThreshold = 2000;
  const progressToNextReward = Math.min((pointsBalance / nextRewardThreshold) * 100, 100);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Meus Pontos</h1>
        <p className="text-muted-foreground">Acompanhe seus pontos de fidelidade e resgate recompensas</p>
      </div>

      {/* Saldo de Pontos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-500" />
              Saldo de Pontos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">{pointsBalance.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">
              Equivale a R$ {pointsValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-500" />
              Próxima Meta
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{nextRewardThreshold.toLocaleString()} pontos</div>
            <p className="text-sm text-muted-foreground">
              Faltam {Math.max(0, nextRewardThreshold - pointsBalance).toLocaleString()} pontos
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${progressToNextReward}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-green-500" />
              Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-green-600">Cliente Ouro</div>
            <p className="text-sm text-muted-foreground">
              Você já acumulou {pointsHistory.filter(h => h.type === 'earned').reduce((sum, h) => sum + h.points, 0).toLocaleString()} pontos
            </p>
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
            <Button className="flex-1" onClick={handleViewRewards}>
              <Gift className="mr-2 h-4 w-4" />
              Ver Todas as Recompensas
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recompensas Rápidas */}
      <Card>
        <CardHeader>
          <CardTitle>Recompensas Populares</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableRewards.slice(0, 3).map((reward) => (
              <div key={reward.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getRewardIcon(reward.type)}
                    <span className="font-medium">{reward.name}</span>
                  </div>
                  <Badge variant="secondary">{reward.pointsCost.toLocaleString()} pts</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{reward.description}</p>
                <Button 
                  size="sm" 
                  className="w-full" 
                  disabled={pointsBalance < reward.pointsCost}
                  onClick={() => handleRedeemPoints(reward)}
                >
                  {pointsBalance >= reward.pointsCost ? 'Resgatar' : 'Pontos Insuficientes'}
                </Button>
              </div>
            ))}
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
              <div 
                key={item.id} 
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted/70 transition-colors"
                onClick={() => handleHistoryItemClick(item)}
              >
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    item.type === 'earned' ? 'bg-green-100' : 
                    item.type === 'bonus' ? 'bg-blue-100' : 'bg-red-100'
                  }`}>
                    {item.type === 'earned' ? <Award className="h-5 w-5 text-green-600" /> :
                     item.type === 'bonus' ? <Trophy className="h-5 w-5 text-blue-600" /> :
                     <Gift className="h-5 w-5 text-red-600" />}
                  </div>
                  <div>
                    <p className="font-medium">{item.description}</p>
                    <p className="text-sm text-muted-foreground">{item.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={
                    item.type === 'earned' ? 'default' : 
                    item.type === 'bonus' ? 'secondary' : 'outline'
                  }>
                    {item.type === 'earned' || item.type === 'bonus' ? '+' : ''}{item.points.toLocaleString()} pts
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dialog de Confirmação de Resgate */}
      <Dialog open={redeemDialogOpen} onOpenChange={setRedeemDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Resgate</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja resgatar {selectedReward?.name}?
            </DialogDescription>
          </DialogHeader>
          {selectedReward && (
            <div className="py-4">
              <div className="flex items-center gap-2 mb-2">
                {getRewardIcon(selectedReward.type)}
                <span className="font-medium">{selectedReward.name}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{selectedReward.description}</p>
              <div className="flex justify-between items-center">
                <span>Custo:</span>
                <Badge variant="outline">{selectedReward.pointsCost.toLocaleString()} pontos</Badge>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span>Saldo após resgate:</span>
                <span className="font-medium">{(pointsBalance - selectedReward.pointsCost).toLocaleString()} pontos</span>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setRedeemDialogOpen(false)}>
              <X className="mr-2 h-4 w-4" />
              Cancelar
            </Button>
            <Button onClick={confirmRedeem}>
              <Check className="mr-2 h-4 w-4" />
              Confirmar Resgate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de Todas as Recompensas */}
      <Dialog open={rewardsDialogOpen} onOpenChange={setRewardsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Todas as Recompensas</DialogTitle>
            <DialogDescription>
              Escolha a recompensa que você deseja resgatar com seus pontos
            </DialogDescription>
          </DialogHeader>
          
          <div className="mb-4">
            <Input
              placeholder="Buscar recompensas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredRewards.map((reward) => (
              <div key={reward.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getRewardIcon(reward.type)}
                    <span className="font-medium">{reward.name}</span>
                  </div>
                  <Badge variant="secondary">{reward.pointsCost.toLocaleString()} pts</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{reward.description}</p>
                <div className="flex justify-between items-center mb-3">
                  <Badge variant="outline">{reward.category}</Badge>
                  <span className="text-sm font-medium">
                    {reward.type === 'discount' || reward.type === 'product' 
                      ? `R$ ${reward.value.toFixed(2)}` 
                      : `${reward.value}%`}
                  </span>
                </div>
                <Button 
                  size="sm" 
                  className="w-full" 
                  disabled={pointsBalance < reward.pointsCost}
                  onClick={() => {
                    handleRedeemPoints(reward);
                    setRewardsDialogOpen(false);
                  }}
                >
                  {pointsBalance >= reward.pointsCost ? 'Resgatar' : 'Pontos Insuficientes'}
                </Button>
              </div>
            ))}
          </div>

          {filteredRewards.length === 0 && (
            <div className="text-center py-8">
              <Gift className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Nenhuma recompensa encontrada</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyPoints;
