
import React, { useState } from 'react';
import { BarChart3, TrendingUp, DollarSign, Users, Package, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Reports = () => {
  const { toast } = useToast();
  const [reportData, setReportData] = useState({
    salesDaily: 1847.50,
    salesWeekly: 8245.30,
    salesMonthly: 32189.45,
    salesYearly: 124567.89,
    activeCustomers: 47,
    productsSold: 89,
    averageTicket: 156.80
  });

  const handleGenerateReport = () => {
    toast({
      title: "Relatório Gerado",
      description: "Relatório completo gerado com dados atualizados do sistema.",
    });
    // Simulando atualização dos dados
    setReportData({
      ...reportData,
      salesDaily: reportData.salesDaily + Math.random() * 100,
      activeCustomers: reportData.activeCustomers + Math.floor(Math.random() * 5),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Relatórios</h1>
          <p className="text-muted-foreground">Análises e estatísticas do negócio</p>
        </div>
        <Button onClick={handleGenerateReport}>
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
            <div className="text-2xl font-bold text-green-600">R$ {reportData.salesDaily.toFixed(2)}</div>
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
            <div className="text-2xl font-bold text-blue-600">{reportData.activeCustomers}</div>
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
            <div className="text-2xl font-bold text-purple-600">{reportData.productsSold}</div>
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
            <div className="text-2xl font-bold text-orange-600">R$ {reportData.averageTicket.toFixed(2)}</div>
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
                <span className="font-medium">R$ {reportData.salesDaily.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Esta Semana</span>
                <span className="font-medium">R$ {reportData.salesWeekly.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Este Mês</span>
                <span className="font-medium">R$ {reportData.salesMonthly.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Este Ano</span>
                <span className="font-medium">R$ {reportData.salesYearly.toFixed(2)}</span>
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
