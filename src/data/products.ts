import { Product, UmbrellaPackage } from '@/types';

// Import images
import caipirinhaImg from '@/assets/caipirinha.jpg';
import camaraoImg from '@/assets/camarao.jpg';
import pastelImg from '@/assets/pastel.jpg';
import tilapiaImg from '@/assets/tilapia.jpg';
import batidaImg from '@/assets/batida.jpg';
import batataFritaImg from '@/assets/batata-frita.jpg';
import peixeMistoImg from '@/assets/peixe-misto.jpg';
import umbrellaSimpleImg from '@/assets/umbrella-simple.jpg';
import umbrellaGrandeImg from '@/assets/umbrella-grande.jpg';
import umbrellaFamiliaImg from '@/assets/umbrella-familia.jpg';

export const destaqueProducts: Product[] = [
  {
    id: '1',
    name: 'Pastel',
    description: 'Pastel crocante recheado com carne, queijo ou camarão',
    price: 8.00,
    image: pastelImg,
    category: 'destaque'
  },
  {
    id: '2', 
    name: 'Camarão',
    description: 'Porção de camarão grelhado com temperos especiais',
    price: 25.00,
    image: camaraoImg,
    category: 'destaque'
  },
  {
    id: '3',
    name: 'Caipirinha',
    description: 'Caipirinha tradicional feita com cachaça artesanal',
    price: 17.00,
    image: caipirinhaImg,
    category: 'destaque'
  },
  {
    id: '4',
    name: 'Tilápia',
    description: 'Filé de tilápia grelhado com limão e ervas',
    price: 22.00,
    image: tilapiaImg,
    category: 'destaque'
  },
  {
    id: '5',
    name: 'Batida',
    description: 'Batida de frutas tropicais gelada',
    price: 15.00,
    image: batidaImg,
    category: 'destaque'
  }
];

export const porcaoProducts: Product[] = [
  {
    id: '6',
    name: 'Batata Frita Clássica',
    description: 'Porção generosa de batatas douradas e crocantes, tempero especial da casa',
    price: 18.00,
    image: batataFritaImg,
    category: 'porcao'
  },
  {
    id: '7',
    name: 'Espetinho de Frutos do Mar',
    description: 'Mix de camarão, lula e peixe grelhados no espeto, acompanha molho especial',
    price: 32.00,
    image: peixeMistoImg,
    category: 'porcao'
  },
  {
    id: '8',
    name: 'Porção de Tilápia Empanada',
    description: 'Filés de tilápia empanados e dourados, acompanha batata e salada',
    price: 28.00,
    image: tilapiaImg,
    category: 'porcao'
  }
];

export const drinkProducts: Product[] = [
  {
    id: '9',
    name: 'Caipirinha Premium',
    description: 'Caipirinha especial com cachaça envelhecida e frutas selecionadas',
    price: 22.00,
    image: caipirinhaImg,
    category: 'drink'
  },
  {
    id: '10',
    name: 'Batida Tropical',
    description: 'Mix de frutas tropicais com vodka, refrescante e saborosa',
    price: 20.00,
    image: batidaImg,
    category: 'drink'
  },
  {
    id: '11',
    name: 'Cerveja Artesanal',
    description: 'Cerveja artesanal gelada, produzida localmente',
    price: 12.00,
    image: batidaImg,
    category: 'drink'
  }
];

export const umbrellaPackages: UmbrellaPackage[] = [
  {
    id: 'simple',
    title: 'Tamanho Simples',
    subtitle: 'guarda sól de tamanho simples para 4 pessoas',
    description: 'Perfeito para casais ou pequenos grupos',
    image: umbrellaSimpleImg,
    features: ['4 cadeiras confortáveis', 'Guarda-sol resistente', 'Mesa lateral']
  },
  {
    id: 'grande',
    title: 'Tamanho Médio', 
    subtitle: 'guarda sól de tamanho Médio para 5 a 6 pessoas',
    description: 'Ideal para grupos Médios e famílias',
    image: umbrellaGrandeImg,
    features: ['5-6 cadeiras', 'Guarda-sol premium', 'Mesa de jantar', 'Serviço de praia']
  },
  {
    id: 'familia',
    title: 'Tamanho Família',
    subtitle: 'guarda sól familiar completo',
    description: 'Perfeito para famílias grandes e grupos',
    image: umbrellaFamiliaImg,
    features: ['8+ cadeiras', 'Guarda-sol XL', 'Mesa grande', 'Serviço premium', 'Área de descanso']
  }
];