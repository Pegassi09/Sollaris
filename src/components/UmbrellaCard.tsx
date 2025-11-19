import { UmbrellaPackage } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

interface UmbrellaCardProps {
  package: UmbrellaPackage;
}

const UmbrellaCard = ({ package: pkg }: UmbrellaCardProps) => {
  const navigate = useNavigate();

  const handleSelectPlan = () => {
    navigate(`/map?plan=${pkg.id}`);
  };

  return (
    <Card className="bg-beach-warm/90 backdrop-blur-sm border-0 shadow-card overflow-hidden text-white">
      <CardContent className="p-0">
        <div className="relative aspect-[4/3]">
          <img
            src={pkg.image}
            alt={pkg.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="font-bold text-2xl mb-2">{pkg.title}</h3>
            <p className="text-white/90 text-sm mb-4">
              {pkg.subtitle}
            </p>
            <Button variant="plan" className="w-full" onClick={handleSelectPlan}>
              Escolher Plano
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UmbrellaCard;