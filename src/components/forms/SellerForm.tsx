import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { X } from 'lucide-react';

interface SellerFormProps {
  seller?: any;
  onSave: (sellerData: any) => void;
  onCancel: () => void;
}

const SellerForm: React.FC<SellerFormProps> = ({ seller, onSave, onCancel }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    id: seller?.id || '',
    name: seller?.name || '',
    email: seller?.email || '',
    phone: seller?.phone || '',
    cpf: seller?.cpf || '',
    store: seller?.store || '',
    active: seller?.active ?? true,
    role: seller?.role || 'vendedor',
    commission: seller?.commission || 5,
    monthlySalesGoal: seller?.monthlySalesGoal || 10000,
    password: '',
    confirmPassword: '',
  });

  const stores = [
    { value: 'Loja Centro', label: 'Loja Centro' },
    { value: 'Loja Shopping', label: 'Loja Shopping' },
    { value: 'Loja Online', label: 'Loja Online' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.store) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    if (!seller && (!formData.password || formData.password !== formData.confirmPassword)) {
      toast({
        title: "Erro",
        description: "Senha e confirmação de senha não coincidem.",
        variant: "destructive"
      });
      return;
    }

    const sellerData = {
      ...formData,
      id: formData.id || Date.now().toString(),
      sales: seller?.sales || 0,
      revenue: seller?.revenue || 0,
      lastLogin: seller?.lastLogin || new Date().toISOString(),
    };

    onSave(sellerData);
    toast({
      title: seller ? "Vendedor Atualizado" : "Vendedor Criado",
      description: `Vendedor ${formData.name} foi ${seller ? 'atualizado' : 'criado'} com sucesso!`,
    });
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{seller ? 'Editar Vendedor' : 'Novo Vendedor'}</CardTitle>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nome Completo *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Telefone *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  value={formData.cpf}
                  onChange={(e) => handleInputChange('cpf', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="store">Loja *</Label>
                <Select value={formData.store} onValueChange={(value) => handleInputChange('store', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma loja" />
                  </SelectTrigger>
                  <SelectContent>
                    {stores.map((store) => (
                      <SelectItem key={store.value} value={store.value}>
                        {store.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="role">Função</Label>
                <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vendedor">Vendedor</SelectItem>
                    <SelectItem value="supervisor">Supervisor</SelectItem>
                    <SelectItem value="gerente">Gerente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="commission">Comissão (%)</Label>
                <Input
                  id="commission"
                  type="number"
                  value={formData.commission}
                  onChange={(e) => handleInputChange('commission', parseFloat(e.target.value))}
                  min="0"
                  max="100"
                  step="0.1"
                />
              </div>
              <div>
                <Label htmlFor="monthlySalesGoal">Meta Mensal (R$)</Label>
                <Input
                  id="monthlySalesGoal"
                  type="number"
                  value={formData.monthlySalesGoal}
                  onChange={(e) => handleInputChange('monthlySalesGoal', parseFloat(e.target.value))}
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            {!seller && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="password">Senha *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirmar Senha *</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Switch
                id="active"
                checked={formData.active}
                onCheckedChange={(checked) => handleInputChange('active', checked)}
              />
              <Label htmlFor="active">Vendedor Ativo</Label>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
              <Button type="submit">
                {seller ? 'Atualizar' : 'Criar'} Vendedor
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SellerForm;