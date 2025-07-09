
import React, { useState } from 'react';
import { Settings as SettingsIcon, Store, User, Shield, Bell, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const { toast } = useToast();
  const [storeData, setStoreData] = useState({
    name: 'Loja Centro',
    phone: '(11) 99999-9999',
    address: 'Rua das Flores, 123 - Centro'
  });

  const [userData, setUserData] = useState({
    name: 'Admin Master',
    email: 'admin@loja.com',
    currentPassword: '',
    newPassword: ''
  });

  const [securityData, setSecurityData] = useState({
    pinCode: '',
    autoApproval: false,
    autoBackup: true
  });

  const [notifications, setNotifications] = useState({
    lowStock: true,
    newSales: true,
    pendingApprovals: true
  });

  const handleSaveStore = () => {
    toast({
      title: "Sucesso!",
      description: "Informações da loja foram atualizadas.",
    });
  };

  const handleUpdateProfile = () => {
    if (userData.currentPassword && userData.newPassword) {
      toast({
        title: "Sucesso!",
        description: "Perfil e senha atualizados com sucesso.",
      });
    } else {
      toast({
        title: "Sucesso!",
        description: "Perfil atualizado com sucesso.",
      });
    }
    setUserData({...userData, currentPassword: '', newPassword: ''});
  };

  const handleSaveSecurity = () => {
    toast({
      title: "Sucesso!",
      description: "Configurações de segurança foram salvas.",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Sucesso!",
      description: "Preferências de notificação foram salvas.",
    });
  };

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
                <Input 
                  id="storeName" 
                  value={storeData.name}
                  onChange={(e) => setStoreData({...storeData, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="storePhone">Telefone</Label>
                <Input 
                  id="storePhone" 
                  value={storeData.phone}
                  onChange={(e) => setStoreData({...storeData, phone: e.target.value})}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="storeAddress">Endereço</Label>
              <Input 
                id="storeAddress" 
                value={storeData.address}
                onChange={(e) => setStoreData({...storeData, address: e.target.value})}
              />
            </div>
            <Button onClick={handleSaveStore}>
              <Save className="mr-2 h-4 w-4" />
              Salvar Alterações
            </Button>
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
                <Input 
                  id="userName" 
                  value={userData.name}
                  onChange={(e) => setUserData({...userData, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="userEmail">E-mail</Label>
                <Input 
                  id="userEmail" 
                  value={userData.email}
                  onChange={(e) => setUserData({...userData, email: e.target.value})}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="currentPassword">Senha Atual</Label>
              <Input 
                id="currentPassword" 
                type="password" 
                value={userData.currentPassword}
                onChange={(e) => setUserData({...userData, currentPassword: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="newPassword">Nova Senha</Label>
              <Input 
                id="newPassword" 
                type="password" 
                value={userData.newPassword}
                onChange={(e) => setUserData({...userData, newPassword: e.target.value})}
              />
            </div>
            <Button onClick={handleUpdateProfile}>
              <Save className="mr-2 h-4 w-4" />
              Atualizar Perfil
            </Button>
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
              <Input 
                id="pinCode" 
                type="password" 
                maxLength={4} 
                placeholder="****" 
                value={securityData.pinCode}
                onChange={(e) => setSecurityData({...securityData, pinCode: e.target.value})}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Aprovação Automática de Créditos</Label>
                <p className="text-sm text-muted-foreground">Créditos de troco são aprovados automaticamente</p>
              </div>
              <Switch 
                checked={securityData.autoApproval}
                onCheckedChange={(checked) => setSecurityData({...securityData, autoApproval: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Backup Automático</Label>
                <p className="text-sm text-muted-foreground">Fazer backup dos dados diariamente</p>
              </div>
              <Switch 
                checked={securityData.autoBackup}
                onCheckedChange={(checked) => setSecurityData({...securityData, autoBackup: checked})}
              />
            </div>
            <Button onClick={handleSaveSecurity}>
              <Save className="mr-2 h-4 w-4" />
              Salvar Configurações
            </Button>
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
              <Switch 
                checked={notifications.lowStock}
                onCheckedChange={(checked) => setNotifications({...notifications, lowStock: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Novas Vendas</Label>
                <p className="text-sm text-muted-foreground">Notificar sobre novas vendas realizadas</p>
              </div>
              <Switch 
                checked={notifications.newSales}
                onCheckedChange={(checked) => setNotifications({...notifications, newSales: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Aprovações Pendentes</Label>
                <p className="text-sm text-muted-foreground">Alertas sobre créditos aguardando aprovação</p>
              </div>
              <Switch 
                checked={notifications.pendingApprovals}
                onCheckedChange={(checked) => setNotifications({...notifications, pendingApprovals: checked})}
              />
            </div>
            <Button onClick={handleSaveNotifications}>
              <Save className="mr-2 h-4 w-4" />
              Salvar Preferências
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
