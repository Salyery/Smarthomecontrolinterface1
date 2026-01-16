import { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import Component1Floor from '../imports/1Floor';
import Component2Floor from '../imports/2Floor';
import Basemant from '../imports/Basemant';
import { Device, Position } from '../types/devices';
import { DeviceIcon } from './DeviceIcon';
import { toast } from 'sonner@2.0.3';

interface FloorPlansProps {
  devices: Device[];
  onDeviceToggle: (deviceId: string) => void;
  isAdminMode: boolean;
  onDeviceMove?: (deviceId: string, newPosition: { x: number; y: number }) => void;
}

export function FloorPlans({ devices, onDeviceToggle, isAdminMode, onDeviceMove }: FloorPlansProps) {
  const [selectedFloor, setSelectedFloor] = useState<'first' | 'second' | 'basement'>('first');
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [polylinePoints, setPolylinePoints] = useState<Position[]>([]);
  const floorPlanRef = useRef<HTMLDivElement>(null);

  const handleDeviceClick = (device: Device) => {
    if (device.type === 'light' || device.type === 'socket' || device.type === 'garland' || device.type === 'ledStrip') {
      if (device.isControllable) {
        onDeviceToggle(device.id);
        toast.success(`${device.name} ${device.status === 'on' ? 'выключен' : 'включен'}`);
      } else {
        toast.info('Это устройство не имеет дистанционного управления');
      }
    } else if (device.type === 'camera') {
      toast.info(`Камера: ${device.name}`);
    }
  };

  const handleDeviceLongPress = (device: Device) => {
    if (device.type === 'light' || device.type === 'socket' || device.type === 'garland' || device.type === 'ledStrip') {
      if (device.isControllable) {
        onDeviceToggle(device.id);
        toast.success(`${device.name} ${device.status === 'on' ? 'выключен' : 'включен'}`);
      }
    }
  };

  const handleDragEnd = (device: Device, e: React.DragEvent) => {
    if (!isAdminMode || !floorPlanRef.current || !onDeviceMove) return;

    const rect = floorPlanRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Convert to percentage-based coordinates
    const maxWidth = selectedFloor === 'basement' ? 1287 : 1960;
    const maxHeight = selectedFloor === 'basement' ? 816 : 1822;
    
    const xPercent = (x / rect.width) * maxWidth;
    const yPercent = (y / rect.height) * maxHeight;

    onDeviceMove(device.id, { x: xPercent, y: yPercent });
    toast.success(`${device.name} перемещен`);
  };

  const handleFloorPlanClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isAdminMode || !isDrawingMode || !floorPlanRef.current) return;

    const rect = floorPlanRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Convert to percentage-based coordinates
    const maxWidth = selectedFloor === 'basement' ? 1287 : 1960;
    const maxHeight = selectedFloor === 'basement' ? 816 : 1822;
    
    const xPercent = (x / rect.width) * maxWidth;
    const yPercent = (y / rect.height) * maxHeight;

    setPolylinePoints([...polylinePoints, { x: xPercent, y: yPercent }]);
  };

  const finishDrawing = () => {
    if (polylinePoints.length < 2) {
      toast.error('Необходимо минимум 2 точки для создания линии');
      return;
    }

    // Here you would create the actual device (extension cord, LED strip, or garland)
    toast.success('Линия создана');
    setPolylinePoints([]);
    setIsDrawingMode(false);
  };

  const cancelDrawing = () => {
    setPolylinePoints([]);
    setIsDrawingMode(false);
    toast.info('Рисование отменено');
  };

  const floorDevices = devices.filter(d => d.floor === selectedFloor);

  const renderFloorPlan = () => {
    switch (selectedFloor) {
      case 'first':
        return <Component1Floor />;
      case 'second':
        return <Component2Floor />;
      case 'basement':
        return <Basemant />;
    }
  };

  // Calculate polyline path for SVG
  const getPolylinePath = () => {
    if (polylinePoints.length === 0) return '';
    
    const maxWidth = selectedFloor === 'basement' ? 1287 : 1960;
    const maxHeight = selectedFloor === 'basement' ? 816 : 1822;
    
    return polylinePoints.map((point, index) => {
      const x = (point.x / maxWidth) * 100;
      const y = (point.y / maxHeight) * 100;
      return `${x}% ${y}%`;
    }).join(', ');
  };

  return (
    <div className="p-4 md:p-6">
      <div className="mb-4 md:mb-6">
        <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">Планы этажей</h2>
        
        {/* Quick Access Buttons */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Button 
            variant={selectedFloor === 'first' ? 'default' : 'outline'}
            onClick={() => setSelectedFloor('first')}
          >
            1-й этаж
          </Button>
          <Button 
            variant={selectedFloor === 'second' ? 'default' : 'outline'}
            onClick={() => setSelectedFloor('second')}
          >
            2-й этаж
          </Button>
          <Button 
            variant={selectedFloor === 'basement' ? 'default' : 'outline'}
            onClick={() => setSelectedFloor('basement')}
          >
            Подвал
          </Button>

          {isAdminMode && (
            <>
              {!isDrawingMode ? (
                <Button 
                  variant="secondary"
                  onClick={() => setIsDrawingMode(true)}
                  className="ml-auto"
                >
                  Нарисовать провод/гирлянду
                </Button>
              ) : (
                <>
                  <Button 
                    variant="default"
                    onClick={finishDrawing}
                    className="ml-auto"
                  >
                    Завершить рисование
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={cancelDrawing}
                  >
                    Отменить
                  </Button>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* Floor Plan Container */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div 
          ref={floorPlanRef}
          className="relative w-full overflow-auto"
          style={{
            aspectRatio: selectedFloor === 'basement' ? '1287/816' : '1960/1822',
            maxHeight: '80vh',
          }}
          onClick={handleFloorPlanClick}
        >
          {/* Floor Plan SVG */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            {renderFloorPlan()}
          </div>

          {/* Drawing Overlay */}
          {isDrawingMode && polylinePoints.length > 0 && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <polyline
                points={getPolylinePath()}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="3"
                strokeDasharray="5,5"
              />
              {polylinePoints.map((point, index) => {
                const maxWidth = selectedFloor === 'basement' ? 1287 : 1960;
                const maxHeight = selectedFloor === 'basement' ? 816 : 1822;
                const xPercent = (point.x / maxWidth) * 100;
                const yPercent = (point.y / maxHeight) * 100;
                
                return (
                  <circle
                    key={index}
                    cx={`${xPercent}%`}
                    cy={`${yPercent}%`}
                    r="5"
                    fill="#3b82f6"
                  />
                );
              })}
            </svg>
          )}

          {/* Device Overlays */}
          <div className="absolute inset-0 pointer-events-none">
            {floorDevices.map((device) => {
              // Skip polyline devices for now (extension cords, garlands, LED strips)
              if (device.type === 'extensionCord' || device.type === 'gate') return null;
              
              // Calculate position as percentage for responsiveness
              const maxWidth = selectedFloor === 'basement' ? 1287 : 1960;
              const maxHeight = selectedFloor === 'basement' ? 816 : 1822;
              
              const leftPercent = (device.position.x / maxWidth) * 100;
              const topPercent = (device.position.y / maxHeight) * 100;

              return (
                <div
                  key={device.id}
                  className="absolute pointer-events-auto"
                  style={{
                    left: `${leftPercent}%`,
                    top: `${topPercent}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <DeviceIcon
                    device={device}
                    onClick={() => !isDrawingMode && handleDeviceClick(device)}
                    onLongPress={() => !isDrawingMode && handleDeviceLongPress(device)}
                    draggable={isAdminMode && !isDrawingMode}
                    onDragEnd={(e) => handleDragEnd(device, e)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {isAdminMode && !isDrawingMode && (
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Режим администратора:</strong> Перетаскивайте устройства для изменения их положения на плане.
          </p>
        </div>
      )}

      {isDrawingMode && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Режим рисования:</strong> Кликайте на плане для добавления точек. Нажмите "Завершить рисование" когда закончите.
            {polylinePoints.length > 0 && ` (Точек: ${polylinePoints.length})`}
          </p>
        </div>
      )}
    </div>
  );
}