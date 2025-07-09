
import React from 'react';
import { Settings as SettingsIcon, Store, User, Shield, Bell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const Settings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
        <p className="text-muted-foreground">Personalize as configurações do sistema</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Store className="h-5 w-5" />
              Informações da Loja
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="storeName">Nome da Loja</Label>
                <Input id="storeName" defaultValue="Loja Centro" />
              </div>
              <div>
                <Label htmlFor="storePhone">Telefone</Label>
                <Input id="storePhone" defaultValue="(11) 99999-9999" />
              </div>
            </div>
            <div>
              <Label htmlFor="storeAddress">Endereço</Label>
              <Input id="storeAddress" defaultValue="Rua das Flores, 123 - Centro" />
            </div>
            <Button>Salvar Alterações</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Configurações de Usuário
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="userName">Nome</Label>
                <Input id="userName" defaultValue="Admin Master" />
              </div>
              <div>
                <Label htmlFor="userEmail">E-mail</Label>
                <Input id="userEmail" defaultValue="admin@loja.com" />
              </div>
            </div>
            <div>
              <Label htmlFor="currentPassword">Senha Atual</Label>
              <Input id="currentPassword" type="password" />
            </div>
            <div>
              <Label htmlFor="newPassword">Nova Senha</Label>
              <Input id="newPassword" type="password" />
            </div>
            <Button>Atualizar Perfil</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Segurança e Permissões
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="pinCode">Código PIN para Aprovações</Label>
              <Input id="pinCode" type="password" maxLength={4} placeholder="****" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Aprovação Automática de Créditos</Label>
                <p className="text-sm text-muted-foreground">Créditos de troco são aprovados automaticamente</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Backup Automático</Label>
                <p className="text-sm text-muted-foreground">Fazer backup dos dados diariamente</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Button>Salvar Configurações</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notificações
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Estoque Baixo</Label>
                <p className="text-sm text-muted-foreground">Receber alertas quando produtos estiverem com estoque baixo</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Novas Vendas</Label>
                <p className="text-sm text-muted-foreground">Notificar sobre novas vendas realizadas</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Aprovações Pendentes</Label>
                <p className="text-sm text-muted-foreground">Alertas sobre créditos aguardando aprovação</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Button>Salvar Preferências</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
