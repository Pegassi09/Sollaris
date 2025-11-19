import { Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import beachHeroBg from '@/assets/beach-hero-bg.jpg';

const Cart = () => {
  const { state, dispatch } = useCart();
  const { toast } = useToast();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', productId, quantity });
  };

  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', productId });
    toast({
      title: 'Item removido',
      description: 'O item foi removido do seu carrinho.',
    });
  };

  const finalizarCompra = () => {
    if (state.items.length === 0) {
      toast({
        title: 'Carrinho vazio',
        description: 'Adicione itens ao carrinho antes de finalizar a compra.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Pedido enviado!',
      description: 'Seu pedido foi enviado para a cozinha. Aguarde na sua mesa.',
    });
    
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <div 
      className="min-h-screen bg-gradient-sand"
      style={{
        backgroundImage: `url(${beachHeroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10 pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="bg-card/95 backdrop-blur-md border-0 shadow-card">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Finalizar Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {state.items.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg mb-4">Seu carrinho está vazio</p>
                  <Button variant="beach" onClick={() => window.history.back()}>
                    Voltar ao Menu
                  </Button>
                </div>
              ) : (
                <>
                  {/* Header da tabela */}
                  <div className="grid grid-cols-12 gap-4 pb-4 border-b border-border font-semibold text-sm text-muted-foreground">
                    <div className="col-span-5">Produto</div>
                    <div className="col-span-2 text-center">Preço unitário</div>
                    <div className="col-span-3 text-center">Quantidade</div>
                    <div className="col-span-2 text-center">Ações</div>
                  </div>

                  {/* Lista de itens */}
                  <div className="space-y-4">
                    {state.items.map((item) => (
                      <div key={item.product.id} className="grid grid-cols-12 gap-4 items-center py-4 border-b border-border/50">
                        {/* Produto */}
                        <div className="col-span-5 flex items-center space-x-3">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <h3 className="font-semibold text-sm">{item.product.name}</h3>
                            <p className="text-xs text-muted-foreground">
                              {item.product.description.split(',')[0]}
                            </p>
                          </div>
                        </div>

                        {/* Preço unitário */}
                        <div className="col-span-2 text-center">
                          <span className="font-semibold text-beach-gold">
                            {formatPrice(item.product.price)}
                          </span>
                        </div>

                        {/* Quantidade */}
                        <div className="col-span-3 flex items-center justify-center space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Ações */}
                        <div className="col-span-2 text-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => removeItem(item.product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-6 border-t border-border">
                    <Button variant="ghost">
                      Adicionar mais itens
                    </Button>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground mb-2">SubTotal:</div>
                      <div className="text-2xl font-bold text-beach-gold">
                        {formatPrice(state.total)}
                      </div>
                    </div>
                  </div>

                  <Button 
                    variant="beach" 
                    className="w-full mt-4"
                    onClick={finalizarCompra}
                  >
                    Finalizar compra
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;