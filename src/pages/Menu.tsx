import { useState } from 'react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { destaqueProducts, porcaoProducts, drinkProducts } from '@/data/products';
import beachHeroBg from '@/assets/beach-hero-bg.jpg';

const Menu = () => {
  const [activeSection, setActiveSection] = useState<'destaques' | 'porcoes' | 'drinks'>('destaques');

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-transparent">
      {/* Hero Section with Menu Title */}
      <section 
        className="relative pt-24 pb-16 px-4"
        style={{
          backgroundImage: `url(${beachHeroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="container mx-auto relative z-10 text-center text-white">
          <div className="inline-block bg-black/20 backdrop-blur-sm rounded-lg px-8 py-4 mb-8">
            <h1 className="text-4xl font-bold mb-2">Nosso Menu</h1>
            <div className="w-32 h-1 bg-beach-gold mx-auto mb-4" />
            <p className="text-xl">Destaques do Dia</p>
          </div>
        </div>
      </section>

      {/* Menu Navigation */}
      <div className="sticky top-20 z-40 bg-background/90 backdrop-blur-md border-b border-border py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-4">
            <Button 
              variant={activeSection === 'destaques' ? 'beach' : 'ghost'}
              onClick={() => scrollToSection('destaques')}
            >
              Destaques do Dia
            </Button>
            <Button 
              variant={activeSection === 'porcoes' ? 'beach' : 'ghost'}
              onClick={() => scrollToSection('porcoes')}
            >
              Porções Grandes
            </Button>
            <Button 
              variant={activeSection === 'drinks' ? 'beach' : 'ghost'}
              onClick={() => scrollToSection('drinks')}
            >
              Drinks (álcool)
            </Button>
          </div>
        </div>
      </div>

      {/* Destaques do Dia */}
      <section id="destaques" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Destaques do Dia</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destaqueProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Porções Grandes */}
      <section id="porcoes" className="py-16 px-4 bg-beach-sand-dark/20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Porções Grandes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {porcaoProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Drinks */}
      <section id="drinks" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Drinks (álcool)</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {drinkProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Menu;