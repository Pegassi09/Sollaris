import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { umbrellaPackages } from '@/data/products';
import { ArrowLeft, MapPin, CheckCircle2 } from 'lucide-react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { toast } from "sonner";

// Constantes para o cálculo da grade
const METERS_TO_COORDS = 1 / 111111; // Aproximação de metros para graus decimais

// --- COORDENADAS DE UBATUBA ---
const NEW_CENTER_LAT = -23.469473;
const NEW_CENTER_LNG = -45.064267;

const MapView = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // --- CHAVE DE API CONFIGURADA ---
  const mapboxToken = "pk.eyJ1IjoiY2F1ZWgxcDNyIiwiYSI6ImNsbG8zMDBubDA1bXYzZW4xY3J1aW56cjkifQ.BW8sXRQtfPcAY6zkrsVnRg";
  
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const [selectedSpot, setSelectedSpot] = useState<{id: string, coords: [number, number]} | null>(null);
  
  const planId = searchParams.get('plan');
  const selectedPlan = umbrellaPackages.find(pkg => pkg.id === planId);

  // --- FUNÇÃO PARA GERAR O TRAPÉZIO INVERTIDO ---
  const generateUmbrellaGrid = (centerLat: number, centerLng: number) => {
    const features = [];
    
    // Configuração da área (Trapézio)
    const height = 44;      // Altura da área em metros
    const spacing = 4.5;    // Espaçamento entre guarda-sóis
    const baseMaior = 60;   // Largura no topo (mais perto do calçadão)
    const baseMenor = 28.5; // Largura na base (mais perto do mar)
    
    // Rotação da grade (0 = alinhado Norte/Sul)
    const rotationDegrees = 60; 

    const angleRad = (Math.PI / 180) * rotationDegrees;
    const cosA = Math.cos(angleRad);
    const sinA = Math.sin(angleRad);

    const rows = Math.floor(height / spacing);
    const lngAdjustment = Math.cos(centerLat * (Math.PI / 180));
    
    // Ponto inicial (Topo Centralizado)
    const startLat = centerLat + (height / 2) * METERS_TO_COORDS;
    
    let featureIdCounter = 0; 

    for (let i = 0; i < rows; i++) {
      // Posição Y (Norte/Sul) em metros
      const y_offset_m = (height / 2) - (i * spacing);

      // Calcula a largura da fileira atual
      const progress = (rows > 1) ? i / (rows - 1) : 0; 
      const currentRowWidth = baseMaior - (progress * (baseMaior - baseMenor));
      const cols = Math.floor(currentRowWidth / spacing);

      // Centraliza a fileira
      const rowStartX_m = -(currentRowWidth / 2);

      for (let j = 0; j < cols; j++) {
        // Posição X (Leste/Oeste) em metros
        const x_offset_m = rowStartX_m + (j * spacing);
        
        // Adiciona variação
        const jitter = 0.5; 
        const jittered_x_m = x_offset_m + (Math.random() - 0.5) * jitter;
        const jittered_y_m = y_offset_m + (Math.random() - 0.5) * jitter;

        // Aplica rotação
        const rotated_x_m = jittered_x_m * cosA - jittered_y_m * sinA;
        const rotated_y_m = jittered_x_m * sinA + jittered_y_m * cosA;

        // Converte para GPS
        const finalLng = centerLng + (rotated_x_m * (METERS_TO_COORDS / lngAdjustment));
        const finalLat = centerLat + (rotated_y_m * METERS_TO_COORDS);

        features.push({
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [finalLng, finalLat] },
          properties: {
            id: featureIdCounter,
            uniqueId: `spot-${i}-${j}`,
            available: Math.random() > 0.3,
            row: i + 1,
            col: j + 1
          }
        });
        featureIdCounter++;
      }
    }
    return features;
  };

  useEffect(() => {
    if (map.current || !mapContainer.current || !selectedPlan) return;

    let currentSelectedId: string | number | null = null;

    const initializeMap = async () => {
      try {
        const mapboxgl = (await import('mapbox-gl')).default;
        mapboxgl.accessToken = mapboxToken;

        const centerCoords: [number, number] = [NEW_CENTER_LNG, NEW_CENTER_LAT]; 

        map.current = new mapboxgl.Map({
          container: mapContainer.current!,
          style: 'mapbox://styles/mapbox/satellite-streets-v12',
          center: centerCoords,
          zoom: 19.5,
          pitch: 40,
        });

        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

        map.current.on('load', () => {
          const umbrellas = generateUmbrellaGrid(centerCoords[1], centerCoords[0]);
          
          map.current.addSource('umbrellas', {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: umbrellas
            },
            promoteId: 'properties.id' 
          });

          // --- ESTILO DOS CÍRCULOS (BRANCO/VERMELHO) ---
          map.current.addLayer({
            id: 'umbrellas-layer',
            type: 'circle',
            source: 'umbrellas',
            paint: {
              'circle-radius': 5.5,
              'circle-color': [ 
                'case',
                ['boolean', ['feature-state', 'selected'], false], '#f59e0b', // Selecionado (Dourado)
                ['to-boolean', ['get', 'available']], '#ffffff',             // Disponível (Branco)
                '#ef4444'                                                    // Ocupado (Vermelho)
              ],
              'circle-stroke-width': 2,
              'circle-stroke-color': [
                'case',
                ['boolean', ['feature-state', 'selected'], false], '#ffffff', // Selecionado (Borda Branca)
                ['to-boolean', ['get', 'available']], '#ef4444',             // Disponível (Borda Vermelha)
                '#ffffff'                                                    // Ocupado (Borda Branca)
              ]
            }
          });

          map.current.on('click', 'umbrellas-layer', (e: any) => {
            if (e.features.length > 0) {
              const feature = e.features[0];
              
              if (!feature.properties.available) {
                toast.error("Este local já está ocupado.");
                return;
              }

              const spotId = feature.id;
              
              if (currentSelectedId !== null) {
                map.current.setFeatureState(
                  { source: 'umbrellas', id: currentSelectedId },
                  { selected: false }
                );
              }
              
              map.current.setFeatureState(
                { source: 'umbrellas', id: spotId },
                { selected: true }
              );
              
              currentSelectedId = spotId;

              setSelectedSpot({
                id: feature.properties.uniqueId,
                coords: feature.geometry.coordinates
              });
              
              toast.success(`Local selecionado! Fileira ${feature.properties.row}, Coluna ${feature.properties.col}`);
            }
          });

          map.current.on('mouseenter', 'umbrellas-layer', (e: any) => {
            if (e.features.length > 0 && e.features[0].properties.available) {
              map.current.getCanvas().style.cursor = 'pointer';
            } else {
              map.current.getCanvas().style.cursor = 'not-allowed';
            }
          });
          map.current.on('mouseleave', 'umbrellas-layer', () => {
            map.current.getCanvas().style.cursor = '';
          });
        });

      } catch (error) {
        console.error('Erro ao carregar o mapa:', error);
      }
    };

    initializeMap();

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [selectedPlan]);

  const handleConfirmReservation = () => {
    if (!selectedSpot) {
      toast.error("Por favor, selecione um guarda-sol no mapa.");
      return;
    }
    toast.success(`Reserva confirmada para o local ${selectedSpot.id}!`);
    console.log("Local reservado:", selectedSpot);
  };

  if (!selectedPlan) return null;

  return (
    <div className="min-h-screen bg-gradient-sand flex flex-col">
      <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border py-4 shadow-sm">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate('/')} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-beach-gold" />
            <span className="font-semibold hidden md:inline">Seleção de Local - {selectedPlan.title}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 container mx-auto p-4 flex flex-col lg:flex-row gap-6">
        <Card className="lg:w-1/4 bg-card/95 backdrop-blur-sm h-fit shadow-card">
          <CardHeader>
            <CardTitle className="text-lg text-center">Sua Escolha</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <img
                src={selectedPlan.image}
                alt={selectedPlan.title}
                className="w-full aspect-video object-cover rounded-lg mb-3 shadow-sm"
              />
              <h3 className="font-bold text-xl text-primary">{selectedPlan.title}</h3>
              <p className="text-sm text-muted-foreground">{selectedPlan.subtitle}</p>
            </div>

            <div className="space-y-2 bg-secondary/20 p-3 rounded-md">
              <h4 className="font-semibold text-sm">Status da Seleção:</h4>
              {selectedSpot ? (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-medium">Guarda-sol selecionado</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>Clique em um ponto no mapa</span>
                </div>
              )}
            </div>

            <div className="space-y-2 text-xs text-muted-foreground">
              <p>Legenda:</p>
              <div className="flex gap-2 items-center"><div className="w-3 h-3 rounded-full bg-white border-2 border-red-500"></div> Disponível</div>
              <div className="flex gap-2 items-center"><div className="w-3 h-3 rounded-full bg-red-500 border-2 border-white"></div> Ocupado</div>
              <div className="flex gap-2 items-center"><div className="w-3 h-3 rounded-full bg-amber-500 border-2 border-white"></div> Selecionado</div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-beach-gold" />
                <span>Localização: Praia de Ubatuba</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Coordenadas: {NEW_CENTER_LAT.toFixed(4)}°, {NEW_CENTER_LNG.toFixed(4)}°
              </p>
            </div>

            <Button 
              className="w-full bg-beach-gold hover:bg-beach-gold/90 text-white font-bold"
              size="lg"
              onClick={handleConfirmReservation}
              disabled={!selectedSpot}
            >
              Confirmar Local
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:w-3/4 bg-card/90 backdrop-blur-sm overflow-hidden shadow-card flex flex-col">
          <CardHeader className="pb-2 border-b">
            <CardTitle className="text-base flex items-center justify-between">
              <span>Vista Satelital - Área de Locação</span>
              <span className="text-xs font-normal text-muted-foreground">Área Aprox. 50m x 60m</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex-1 min-h-[500px] relative">
            <div ref={mapContainer} className="absolute inset-0 w-full h-full" />
            
            {!selectedSpot && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm pointer-events-none backdrop-blur-sm">
                Selecione um ponto disponível
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MapView;