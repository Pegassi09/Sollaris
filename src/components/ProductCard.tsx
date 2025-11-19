import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { dispatch } = useCart();
  const { toast } = useToast();

  const addToCart = () => {
    dispatch({ type: 'ADD_ITEM', product });
    toast({
      title: 'Adicionado ao carrinho',
      description: `${product.name} foi adicionado ao seu pedido.`,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <Card className="bg-card/90 backdrop-blur-sm border-0 shadow-card overflow-hidden">
      <CardContent className="p-0">
        <div className="relative aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 text-foreground">{product.name}</h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="font-bold text-xl text-beach-gold">
              {formatPrice(product.price)}
            </span>
            <Button variant="cart" size="sm" onClick={addToCart}>
              ao carrinho
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;