import { Thermometer, Droplets, Zap, Camera, LightbulbIcon, Power, FileText, DoorOpen, Cloud, Sun, CloudRain } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { mockSensors, mockLights, mockSockets, mockWeather } from '../data/mockData';
import { Device } from '../types/devices';

interface DashboardProps {
  devices: Device[];
  onDeviceToggle: (deviceId: string) => void;
  onOpenGate: () => void;
  onViewCameras: () => void;
}

export function Dashboard({ devices, onDeviceToggle, onOpenGate, onViewCameras }: DashboardProps) {
  const sensors = devices.filter(d => d.type === 'sensor');
  const activeLights = devices.filter(d => d.type === 'light' && d.status === 'on');
  const activeSockets = devices.filter(d => d.type === 'socket' && d.status === 'on');

  const getWeatherIcon = (condition: string) => {
    if (condition.includes('облач')) return <Cloud className="size-8 text-gray-500" />;
    if (condition.includes('дожд')) return <CloudRain className="size-8 text-blue-500" />;
    return <Sun className="size-8 text-yellow-500" />;
  };

  const turnOffAllLights = () => {
    devices.filter(d => d.type === 'light' && d.status === 'on').forEach(light => {
      onDeviceToggle(light.id);
    });
  };

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      {/* Sensors Grid */}
      <div>
        <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">Датчики</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {sensors.map((sensor) => {
            if (sensor.type !== 'sensor') return null;
            
            const isLowBattery = sensor.battery !== undefined && sensor.battery < 20;
            const isOffline = !sensor.isOnline;
            
            return (
              <Card 
                key={sensor.id} 
                className={`${isLowBattery ? 'border-red-500 bg-red-50' : ''} ${isOffline ? 'border-gray-400 bg-gray-100' : ''}`}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center justify-between">
                    <span>{sensor.name}</span>
                    {sensor.battery !== undefined && (
                      <Badge variant={isLowBattery ? 'destructive' : 'secondary'}>
                        {sensor.battery}%
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isOffline ? (
                    <div className="text-red-600 font-semibold flex items-center gap-2">
                      <Zap className="size-4" />
                      Датчик офлайн
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Thermometer className="size-4 text-red-500" />
                        <span>{sensor.temperature}°C</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Droplets className="size-4 text-blue-500" />
                        <span>{sensor.humidity}%</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Weather Forecast */}
      <Card>
        <CardHeader>
          <CardTitle>Прогноз погоды на {mockWeather.date}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            {getWeatherIcon(mockWeather.condition)}
            <div>
              <p className="text-3xl font-bold">{mockWeather.temperature}°C</p>
              <p className="text-gray-600">{mockWeather.condition}</p>
              <p className="text-sm text-gray-500">Влажность: {mockWeather.humidity}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Быстрые действия</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button 
            onClick={turnOffAllLights}
            className="h-24 flex flex-col gap-2"
            variant="outline"
          >
            <Power className="size-6" />
            <span>Выключить весь свет</span>
          </Button>
          
          <Button 
            onClick={onOpenGate}
            className="h-24 flex flex-col gap-2"
            variant="outline"
          >
            <DoorOpen className="size-6" />
            <span>Открыть ворота</span>
          </Button>
          
          <Button 
            onClick={onViewCameras}
            className="h-24 flex flex-col gap-2"
            variant="outline"
          >
            <Camera className="size-6" />
            <span>Смотреть камеры</span>
          </Button>
          
          <Button 
            onClick={() => alert('Инструкция:\n1. Проверьте уровень топлива\n2. Откройте кран подачи топлива\n3. Нажмите кнопку запуска\n4. Подождите 30 секунд\n5. Подключите основное питание')}
            className="h-24 flex flex-col gap-2"
            variant="outline"
          >
            <FileText className="size-6" />
            <span>Инструкция генератора</span>
          </Button>
        </div>
      </div>

      {/* Active Lights */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Включенное освещение ({activeLights.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeLights.map((light) => (
            <Card key={light.id}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <LightbulbIcon className="size-5 text-yellow-500 fill-yellow-500" />
                    <span className="font-medium">{light.name}</span>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onDeviceToggle(light.id)}
                  >
                    Выключить
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {activeLights.length === 0 && (
            <p className="text-gray-500 col-span-full">Нет включенного освещения</p>
          )}
        </div>
      </div>

      {/* Active Sockets */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Включенные розетки ({activeSockets.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeSockets.map((socket) => {
            if (socket.type !== 'socket') return null;
            
            return (
              <Card key={socket.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Zap className="size-5 text-blue-500" />
                      <div>
                        <p className="font-medium">{socket.name}</p>
                        {socket.powerUsage && (
                          <p className="text-sm text-gray-500">{socket.powerUsage}W</p>
                        )}
                      </div>
                    </div>
                    {socket.isSmart && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => onDeviceToggle(socket.id)}
                      >
                        Выключить
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
          {activeSockets.length === 0 && (
            <p className="text-gray-500 col-span-full">Нет включенных розеток</p>
          )}
        </div>
      </div>
    </div>
  );
}