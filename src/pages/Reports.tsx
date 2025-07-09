
import React from 'react';
import { BarChart3, TrendingUp, DollarSign, Users, Package, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Reports = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Relatórios</h1>
          <p className="text-muted-foreground">Análises e estatísticas do negócio</p>
        </div>
        <Button>
          <Calendar className="mr-2 h-4 w-4" />
          Gerar Relatório
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Vendas Hoje
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">R$ 1.847,50</div>
            <p className="text-xs text-muted-foreground">+15% vs ontem</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4" />
              Clientes Ativos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">47</div>
            <p className="text-xs text-muted-foreground">+5 novos hoje</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Package className="h-4 w-4" />
              Produtos Vendidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">89</div>
            <p className="text-xs text-muted-foreground">Unidades hoje</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Ticket Médio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">R$ 156,80</div>
            <p className="text-xs text-muted-foreground">+8% vs semana passada</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Vendas por Período
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Hoje</span>
                <span className="font-medium">R$ 1.847,50</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Esta Semana</span>
                <span className="font-medium">R$ 8.245,30</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Este Mês</span>
                <span className="font-medium">R$ 32.189,45</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Este Ano</span>
                <span className="font-medium">R$ 124.567,89</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Formas de Pagamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Pix</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-2 bg-blue-200 rounded-full">
                    <div className="w-10 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">45%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Cartão</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-2 bg-green-200 rounded-full">
                    <div className="w-8 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">35%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Dinheiro</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-2 bg-yellow-200 rounded-full">
                    <div className="w-4 h-2 bg-yellow-600 rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">20%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
