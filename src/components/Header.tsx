import { ShoppingCart, Menu, Home, X, Phone, MapPin, Clock, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
  const { state } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const navigationItems = [
    { name: 'Início', icon: Home, path: '/', description: 'Página inicial e guarda-sóis' },
    { name: 'Menu', icon: Menu, path: '/menu', description: 'Cardápio completo' },
    { name: 'GPS', icon: Navigation, path: '/map', description: 'Mapa científico' },
    { name: 'Checkout', icon: ShoppingCart, path: '/cart', description: 'Finalizar pedido' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setSidebarOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 backdrop-blur-md bg-background/70">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
              <span className="text-xs text-foreground/60">Logo</span>
            </div>
            <div>
              <h1 className="text-beach-gold font-bold text-xl">Sollaris</h1>
              <p className="text-xs text-muted-foreground">sistema de locação de guarda-sóis e gerenciamento de menu</p>
            </div>
          </div>

          {/* Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
            className="text-foreground hover:bg-beach-gold/20"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[60]"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-80 bg-white z-[70] transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-beach-gold rounded-md flex items-center justify-center">
              <span className="text-white text-xs">☀</span>
            </div>
            <div>
              <h2 className="font-semibold text-beach-gold">Sollaris Beach Club</h2>
              <p className="text-xs text-muted-foreground">Navegue pelo nosso beach club</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(false)}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation Section */}
        <div className="p-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-4 tracking-wider">NAVEGAÇÃO</h3>
          <div className="space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.path)}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors text-left"
              >
                <item.icon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-muted-foreground">{item.description}</div>
                </div>
                {item.name === 'Checkout' && totalItems > 0 && (
                  <div className="ml-auto bg-beach-gold text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Contact & Information Section */}
        <div className="p-4 border-t">
          <h3 className="text-sm font-medium text-muted-foreground mb-4 tracking-wider">CONTATO & INFORMAÇÕES</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-beach-gold" />
              <div>
                <div className="font-medium">Telefone</div>
                <div className="text-sm text-muted-foreground">(11) 99999-9999</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-beach-gold" />
              <div>
                <div className="font-medium">Localização</div>
                <div className="text-sm text-muted-foreground">Praia do Sollaris</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-beach-gold" />
              <div>
                <div className="font-medium">Horário</div>
                <div className="text-sm text-muted-foreground">8h às 18h todos os dias</div>
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="p-4 border-t">
          <button className="text-beach-gold font-medium hover:underline">
            Precisa de ajuda?
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;