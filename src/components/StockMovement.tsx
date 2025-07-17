
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { X, ArrowDown, ArrowUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: number;
  name: string;
  stock: number;
}

interface StockMovementProps {
  product: Product;
  type: 'entrada' | 'saida';
  onClose: () => void;
  onConfirm: (product: Product, quantity: number, reason: string) => void;
}

export const StockMovement = ({ product, type, onClose, onConfirm }: StockMovementProps) => {
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [reason, setReason] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (quantity <= 0) {
      toast({
        title: "Erro",
        description: "A quantidade deve ser maior que zero.",
        variant: "destructive"
      });
      return;
    }

    if (type === 'saida' && quantity > product.stock) {
      toast({
        title: "Erro",
        description: "Não há estoque suficiente para esta saída.",
        variant: "destructive"
      });
      return;
    }

    if (!reason.trim()) {
      toast({
        title: "Erro",
        description: "Informe o motivo da movimentação.",
        variant: "destructive"
      });
      return;
    }

    onConfirm(product, quantity, reason);
    toast({
      title: `${type === 'entrada' ? 'Entrada' : 'Saída'} Registrada`,
      description: `${type === 'entrada' ? 'Entrada' : 'Saída'} de ${quantity} unidades de ${product.name} registrada com sucesso.`
    });
    onClose();
  };

  const newStock = type === 'entrada' 
    ? product.stock + quantity 
    : product.stock - quantity;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            {type === 'entrada' ? (
              <ArrowDown className="h-5 w-5 text-green-600" />
            ) : (
              <ArrowUp className="h-5 w-5 text-red-600" />
            )}
            {type === 'entrada' ? 'Entrada' : 'Saída'} de Estoque
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Produto</Label>
              <p className="font-medium p-2 bg-muted rounded">{product.name}</p>
            </div>

            <div>
              <Label>Estoque Atual</Label>
              <p className="font-medium p-2 bg-muted rounded">{product.stock} unidades</p>
            </div>

            <div>
              <Label htmlFor="quantity">Quantidade *</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                max={type === 'saida' ? product.stock : undefined}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                required
              />
            </div>

            <div>
              <Label>Novo Estoque</Label>
              <p className={`font-medium p-2 rounded ${
                newStock >= 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
              }`}>
                {newStock} unidades
              </p>
            </div>

            <div>
              <Label htmlFor="reason">Motivo *</Label>
              <Textarea
                id="reason"
                placeholder={`Digite o motivo da ${type}...`}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button 
                type="submit" 
                className={type === 'entrada' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
              >
                Confirmar {type === 'entrada' ? 'Entrada' : 'Saída'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
