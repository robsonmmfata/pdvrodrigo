
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { X } from 'lucide-react';

interface Customer {
  id?: string;
  name: string;
  whatsapp: string;
  cpf: string;
  birthDate: string;
  loyaltyPoints?: number;
  credits?: number;
}

interface CustomerFormProps {
  customer?: Customer;
  onSave: (customer: Customer) => void;
  onCancel: () => void;
}

export const CustomerForm = ({ customer, onSave, onCancel }: CustomerFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Customer>({
    name: customer?.name || '',
    whatsapp: customer?.whatsapp || '',
    cpf: customer?.cpf || '',
    birthDate: customer?.birthDate || '',
    loyaltyPoints: customer?.loyaltyPoints || 0,
    credits: customer?.credits || 0,
    ...customer
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.whatsapp) {
      toast({
        title: "Erro",
        description: "Nome e WhatsApp são obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    // Validar formato do WhatsApp
    const whatsappRegex = /^\d{10,11}$/;
    const cleanWhatsapp = formData.whatsapp.replace(/\D/g, '');
    if (!whatsappRegex.test(cleanWhatsapp)) {
      toast({
        title: "Erro",
        description: "WhatsApp deve ter 10 ou 11 dígitos.",
        variant: "destructive"
      });
      return;
    }

    onSave({
      ...formData,
      whatsapp: cleanWhatsapp
    });
    
    toast({
      title: "Sucesso!",
      description: `Cliente ${customer ? 'atualizado' : 'cadastrado'} com sucesso.`
    });
  };

  const formatWhatsApp = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 10) {
      return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  const formatCPF = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{customer ? 'Editar Cliente' : 'Novo Cliente'}</CardTitle>
        <Button variant="ghost" size="icon" onClick={onCancel}>
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
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="whatsapp">WhatsApp *</Label>
              <Input
                id="whatsapp"
                value={formatWhatsApp(formData.whatsapp)}
                onChange={(e) => setFormData({...formData, whatsapp: e.target.value.replace(/\D/g, '')})}
                placeholder="(11) 99999-9999"
                required
              />
            </div>
            <div>
              <Label htmlFor="cpf">CPF</Label>
              <Input
                id="cpf"
                value={formatCPF(formData.cpf)}
                onChange={(e) => setFormData({...formData, cpf: e.target.value.replace(/\D/g, '')})}
                placeholder="000.000.000-00"
                maxLength={14}
              />
            </div>
            <div>
              <Label htmlFor="birthDate">Data de Nascimento</Label>
              <Input
                id="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button type="submit" className="flex-1">
              {customer ? 'Atualizar' : 'Cadastrar'} Cliente
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
