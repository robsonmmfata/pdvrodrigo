
import React, { useState } from 'react';
import { Settings as SettingsIcon, Store, User, Shield, Bell, Save, Edit, Check, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const Settings = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [editingSection, setEditingSection] = useState<string | null>(null);
  
  const [storeData, setStoreData] = useState({
    name: 'Loja Centro',
    phone: '(11) 99999-9999',
    address: 'Rua das Flores, 123 - Centro',
    email: 'loja@centro.com',
    cnpj: '12.345.678/0001-90'
  });

  const [userData, setUserData] = useState({
    name: user?.name || 'Admin Master',
    email: user?.email || 'admin@loja.com',
    phone: '(11) 98765-4321',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [securityData, setSecurityData] = useState({
    pinCode: '',
    autoApproval: false,
    autoBackup: true,
    twoFactorAuth: false,
    sessionTimeout: 30,
    maxLoginAttempts: 3
  });

  const [notifications, setNotifications] = useState({
    lowStock: true,
    newSales: true,
    pendingApprovals: true,
    systemUpdates: false,
    weeklyReports: true,
    monthlyReports: true
  });

  const [systemSettings, setSystemSettings] = useState({
    currency: 'BRL',
    timezone: 'America/Sao_Paulo',
    dateFormat: 'DD/MM/YYYY',
    language: 'pt-BR',
    theme: 'light'
  });

  const handleEdit = (section: string) => {
    setEditingSection(section);
  };

  const handleCancel = () => {
    setEditingSection(null);
    // Reset form data here if needed
  };

  const handleSaveStore = () => {
    if (!storeData.name.trim() || !storeData.email.trim()) {
      toast({
        title: "Erro!",
        description: "Nome e email da loja são obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Sucesso!",
      description: "Informações da loja foram atualizadas.",
    });
    setEditingSection(null);
  };

  const handleUpdateProfile = () => {
    if (!userData.name.trim() || !userData.email.trim()) {
      toast({
        title: "Erro!",
        description: "Nome e email são obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    if (userData.newPassword && userData.newPassword !== userData.confirmPassword) {
      toast({
        title: "Erro!",
        description: "As senhas não coincidem.",
        variant: "destructive"
      });
      return;
    }

    if (userData.newPassword && userData.newPassword.length < 6) {
      toast({
        title: "Erro!",
        description: "A nova senha deve ter pelo menos 6 caracteres.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Sucesso!",
      description: userData.newPassword ? "Perfil e senha atualizados!" : "Perfil atualizado!",
    });
    
    setUserData({...userData, currentPassword: '', newPassword: '', confirmPassword: ''});
    setEditingSection(null);
  };

  const handleSaveSecurity = () => {
    if (securityData.pinCode && securityData.pinCode.length !== 4) {
      toast({
        title: "Erro!",
        description: "O PIN deve ter exatamente 4 dígitos.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Sucesso!",
      description: "Configurações de segurança foram salvas.",
    });
    setEditingSection(null);
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Sucesso!",
      description: "Preferências de notificação foram salvas.",
    });
    setEditingSection(null);
  };

  const handleSaveSystem = () => {
    toast({
      title: "Sucesso!",
      description: "Configurações do sistema foram salvas.",
    });
    setEditingSection(null);
  };

  const EditButtons = ({ section, onSave }: { section: string; onSave: () => void }) => (
    <div className="flex gap-2">
      {editingSection === section ? (
        <>
          <Button size="sm" onClick={onSave} className="bg-green-600 hover:bg-green-700">
            <Check className="mr-1 h-3 w-3" />
            Salvar
          </Button>
          <Button size="sm" variant="outline" onClick={handleCancel}>
            <X className="mr-1 h-3 w-3" />
            Cancelar
          </Button>
        </>
      ) : (
        <Button size="sm" variant="outline" onClick={() => handleEdit(section)}>
          <Edit className="mr-1 h-3 w-3" />
          Editar
        </Button>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
          <p className="text-muted-foreground">Personalize as configurações do sistema</p>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Informações da Loja */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Store className="h-5 w-5" />
                Informações da Loja
              </CardTitle>
              <EditButtons section="store" onSave={handleSaveStore} />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="storeName">Nome da Loja</Label>
                <Input 
                  id="storeName" 
                  value={storeData.name}
                  onChange={(e) => setStoreData({...storeData, name: e.target.value})}
                  disabled={editingSection !== "store"}
                />
              </div>
              <div>
                <Label htmlFor="storePhone">Telefone</Label>
                <Input 
                  id="storePhone" 
                  value={storeData.phone}
                  onChange={(e) => setStoreData({...storeData, phone: e.target.value})}
                  disabled={editingSection !== "store"}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="storeEmail">Email</Label>
              <Input 
                id="storeEmail" 
                type="email"
                value={storeData.email}
                onChange={(e) => setStoreData({...storeData, email: e.target.value})}
                disabled={editingSection !== "store"}
              />
            </div>
            <div>
              <Label htmlFor="storeAddress">Endereço</Label>
              <Input 
                id="storeAddress" 
                value={storeData.address}
                onChange={(e) => setStoreData({...storeData, address: e.target.value})}
                disabled={editingSection !== "store"}
              />
            </div>
            <div>
              <Label htmlFor="storeCnpj">CNPJ</Label>
              <Input 
                id="storeCnpj" 
                value={storeData.cnpj}
                onChange={(e) => setStoreData({...storeData, cnpj: e.target.value})}
                disabled={editingSection !== "store"}
              />
            </div>
          </CardContent>
        </Card>

        {/* Configurações de Usuário */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Configurações de Usuário
              </CardTitle>
              <EditButtons section="user" onSave={handleUpdateProfile} />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="userName">Nome</Label>
                <Input 
                  id="userName" 
                  value={userData.name}
                  onChange={(e) => setUserData({...userData, name: e.target.value})}
                  disabled={editingSection !== "user"}
                />
              </div>
              <div>
                <Label htmlFor="userEmail">E-mail</Label>
                <Input 
                  id="userEmail" 
                  type="email"
                  value={userData.email}
                  onChange={(e) => setUserData({...userData, email: e.target.value})}
                  disabled={editingSection !== "user"}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="userPhone">Telefone</Label>
              <Input 
                id="userPhone" 
                value={userData.phone}
                onChange={(e) => setUserData({...userData, phone: e.target.value})}
                disabled={editingSection !== "user"}
              />
            </div>
            
            {editingSection === "user" && (
              <>
                <div>
                  <Label htmlFor="currentPassword">Senha Atual</Label>
                  <Input 
                    id="currentPassword" 
                    type="password" 
                    value={userData.currentPassword}
                    onChange={(e) => setUserData({...userData, currentPassword: e.target.value})}
                    placeholder="Digite sua senha atual"
                  />
                </div>
                <div>
                  <Label htmlFor="newPassword">Nova Senha</Label>
                  <Input 
                    id="newPassword" 
                    type="password" 
                    value={userData.newPassword}
                    onChange={(e) => setUserData({...userData, newPassword: e.target.value})}
                    placeholder="Digite a nova senha"
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                  <Input 
                    id="confirmPassword" 
                    type="password" 
                    value={userData.confirmPassword}
                    onChange={(e) => setUserData({...userData, confirmPassword: e.target.value})}
                    placeholder="Confirme a nova senha"
                  />
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Segurança e Permissões */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Segurança e Permissões
              </CardTitle>
              <EditButtons section="security" onSave={handleSaveSecurity} />
            </div>
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
                onChange={(e) => setSecurityData({...securityData, pinCode: e.target.value.replace(/\D/g, '')})}
                disabled={editingSection !== "security"}
              />
            </div>
            
            <div>
              <Label htmlFor="sessionTimeout">Timeout da Sessão (minutos)</Label>
              <Input 
                id="sessionTimeout" 
                type="number" 
                min="5"
                max="480"
                value={securityData.sessionTimeout}
                onChange={(e) => setSecurityData({...securityData, sessionTimeout: parseInt(e.target.value) || 30})}
                disabled={editingSection !== "security"}
              />
            </div>

            <div>
              <Label htmlFor="maxLoginAttempts">Máximo de Tentativas de Login</Label>
              <Input 
                id="maxLoginAttempts" 
                type="number" 
                min="1"
                max="10"
                value={securityData.maxLoginAttempts}
                onChange={(e) => setSecurityData({...securityData, maxLoginAttempts: parseInt(e.target.value) || 3})}
                disabled={editingSection !== "security"}
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
                disabled={editingSection !== "security"}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Autenticação de Dois Fatores</Label>
                <p className="text-sm text-muted-foreground">Adiciona uma camada extra de segurança</p>
              </div>
              <Switch 
                checked={securityData.twoFactorAuth}
                onCheckedChange={(checked) => setSecurityData({...securityData, twoFactorAuth: checked})}
                disabled={editingSection !== "security"}
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
                disabled={editingSection !== "security"}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notificações */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notificações
              </CardTitle>
              <EditButtons section="notifications" onSave={handleSaveNotifications} />
            </div>
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
                disabled={editingSection !== "notifications"}
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
                disabled={editingSection !== "notifications"}
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
                disabled={editingSection !== "notifications"}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Atualizações do Sistema</Label>
                <p className="text-sm text-muted-foreground">Notificações sobre atualizações e manutenções</p>
              </div>
              <Switch 
                checked={notifications.systemUpdates}
                onCheckedChange={(checked) => setNotifications({...notifications, systemUpdates: checked})}
                disabled={editingSection !== "notifications"}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Relatórios Semanais</Label>
                <p className="text-sm text-muted-foreground">Receber relatórios semanais por email</p>
              </div>
              <Switch 
                checked={notifications.weeklyReports}
                onCheckedChange={(checked) => setNotifications({...notifications, weeklyReports: checked})}
                disabled={editingSection !== "notifications"}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Relatórios Mensais</Label>
                <p className="text-sm text-muted-foreground">Receber relatórios mensais por email</p>
              </div>
              <Switch 
                checked={notifications.monthlyReports}
                onCheckedChange={(checked) => setNotifications({...notifications, monthlyReports: checked})}
                disabled={editingSection !== "notifications"}
              />
            </div>
          </CardContent>
        </Card>

        {/* Configurações do Sistema */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="h-5 w-5" />
                Configurações do Sistema
              </CardTitle>
              <EditButtons section="system" onSave={handleSaveSystem} />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="currency">Moeda</Label>
                <select 
                  id="currency"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  value={systemSettings.currency}
                  onChange={(e) => setSystemSettings({...systemSettings, currency: e.target.value})}
                  disabled={editingSection !== "system"}
                >
                  <option value="BRL">Real Brasileiro (R$)</option>
                  <option value="USD">Dólar Americano ($)</option>
                  <option value="EUR">Euro (€)</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="language">Idioma</Label>
                <select 
                  id="language"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  value={systemSettings.language}
                  onChange={(e) => setSystemSettings({...systemSettings, language: e.target.value})}
                  disabled={editingSection !== "system"}
                >
                  <option value="pt-BR">Português (Brasil)</option>
                  <option value="en-US">English (US)</option>
                  <option value="es-ES">Español</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dateFormat">Formato de Data</Label>
                <select 
                  id="dateFormat"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  value={systemSettings.dateFormat}
                  onChange={(e) => setSystemSettings({...systemSettings, dateFormat: e.target.value})}
                  disabled={editingSection !== "system"}
                >
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="timezone">Fuso Horário</Label>
                <select 
                  id="timezone"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  value={systemSettings.timezone}
                  onChange={(e) => setSystemSettings({...systemSettings, timezone: e.target.value})}
                  disabled={editingSection !== "system"}
                >
                  <option value="America/Sao_Paulo">São Paulo (GMT-3)</option>
                  <option value="America/New_York">New York (GMT-5)</option>
                  <option value="Europe/London">London (GMT+0)</option>
                </select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="theme">Tema</Label>
              <select 
                id="theme"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                value={systemSettings.theme}
                onChange={(e) => setSystemSettings({...systemSettings, theme: e.target.value})}
                disabled={editingSection !== "system"}
              >
                <option value="light">Claro</option>
                <option value="dark">Escuro</option>
                <option value="auto">Automático</option>
              </select>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
