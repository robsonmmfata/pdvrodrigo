
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, TrendingUp, Users, Package, DollarSign, FileBarChart } from 'lucide-react';

interface Store {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
}

interface StoreReportsProps {
  store: Store;
  onClose: () => void;
}

export const StoreReports = ({ store, onClose }: StoreReportsProps) => {
  const reportData = {
    totalSales: 125430.50,
    totalOrders: 342,
    activeProducts: 28,
    totalCustomers: 156,
    topProducts: [
      { name: 'iPhone 15 Pro Max 256GB', sales: 23, revenue: 183999.77 },
      { name: 'iPhone 14 128GB', sales: 18, revenue: 89999.82 },
      { name: 'iPhone 13 128GB', sales: 15, revenue: 56999.85 }
    ],
    monthlyGrowth: 12.5,
    avgOrderValue: 366.75
  };

  const generatePDFReport = () => {
    // Simulação de geração de PDF
    const reportContent = `
RELATÓRIO DETALHADO DA LOJA
${store.name}
${store.address}

=== RESUMO EXECUTIVO ===
Total de Vendas: R$ ${reportData.totalSales.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
Total de Pedidos: ${reportData.totalOrders}
Produtos Ativos: ${reportData.activeProducts}
Total de Clientes: ${reportData.totalCustomers}
Crescimento Mensal: ${reportData.monthlyGrowth}%
Valor Médio do Pedido: R$ ${reportData.avgOrderValue.toFixed(2)}

=== PRODUTOS MAIS VENDIDOS ===
${reportData.topProducts.map((product, index) => 
  `${index + 1}. ${product.name} - ${product.sales} vendas - R$ ${product.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
).join('\n')}

Relatório gerado em: ${new Date().toLocaleString('pt-BR')}
    `;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio_${store.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <FileBarChart className="h-5 w-5" />
          Relatórios - {store.name}
        </CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    R$ {reportData.totalSales.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-sm text-muted-foreground">Vendas Totais</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Package className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold text-blue-600">{reportData.totalOrders}</p>
                  <p className="text-sm text-muted-foreground">Pedidos</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Users className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold text-purple-600">{reportData.totalCustomers}</p>
                  <p className="text-sm text-muted-foreground">Clientes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-8 w-8 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold text-orange-600">{reportData.monthlyGrowth}%</p>
                  <p className="text-sm text-muted-foreground">Crescimento</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Produtos Mais Vendidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reportData.topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="font-bold text-primary">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.sales} vendas</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">
                      R$ {product.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-2">
          <Button onClick={generatePDFReport}>
            <FileBarChart className="mr-2 h-4 w-4" />
            Baixar Relatório Completo
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
