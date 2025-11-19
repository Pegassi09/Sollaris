import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import UmbrellaCard from '@/components/UmbrellaCard';
import ProductCard from '@/components/ProductCard';
import { umbrellaPackages, destaqueProducts } from '@/data/products';
import beachHeroBg from '@/assets/beach-hero-bg.jpg';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-sand">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center px-4"
        style={{
          backgroundImage: `url(${beachHeroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="container mx-auto relative z-10 text-center text-white">
          <div className="mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Alugue seu guarda sól!
            </h1>
            <p className="text-xl md:text-2xl">
              Selecione qual plano mais o agrada
            </p>
          </div>

          {/* Umbrella Packages */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {umbrellaPackages.map((pkg) => (
              <UmbrellaCard key={pkg.id} package={pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* Menu Preview Section */}
      <section className="py-16 px-4 bg-beach-warm/20">
        <div className="container mx-auto text-center">
          <div className="inline-block bg-beach-sand/90 backdrop-blur-sm rounded-lg px-8 py-6 mb-12">
            <h2 className="text-3xl font-bold mb-2 text-foreground">Nosso Menu</h2>
            <div className="w-24 h-1 bg-beach-gold mx-auto mb-4" />
            <p className="text-xl text-muted-foreground">Destaques do Dia</p>
          </div>

          {/* Featured Products Preview */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-12">
            {destaqueProducts.map((product) => (
              <Card key={product.id} className="bg-card/90 backdrop-blur-sm border-0 shadow-card overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative aspect-square">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                      <h3 className="text-white font-bold text-lg">{product.name}</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button 
            variant="beach" 
            size="lg" 
            onClick={() => navigate('/menu')}
            className="text-lg px-12"
          >
            Ir para Menu
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
