import { 
  LightbulbIcon, 
  Thermometer, 
  Zap, 
  Tv, 
  Camera, 
  Clock, 
  Wifi,
  Sparkles
} from 'lucide-react';
import { Device } from '../types/devices';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

interface DeviceIconProps {
  device: Device;
  onClick?: () => void;
  onLongPress?: () => void;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent) => void;
  onDragEnd?: (e: React.DragEvent) => void;
}

export function DeviceIcon({ 
  device, 
  onClick, 
  onLongPress,
  draggable = false,
  onDragStart,
  onDragEnd 
}: DeviceIconProps) {
  let longPressTimer: NodeJS.Timeout;

  const handleTouchStart = () => {
    longPressTimer = setTimeout(() => {
      onLongPress?.();
    }, 500);
  };

  const handleTouchEnd = () => {
    clearTimeout(longPressTimer);
  };

  const getIcon = () => {
    switch (device.type) {
      case 'light':
        return <LightbulbIcon className="size-6" />;
      case 'sensor':
        return <Thermometer className="size-6" />;
      case 'socket':
        return <Zap className="size-6" />;
      case 'tv':
        return <Tv className="size-6" />;
      case 'camera':
        return <Camera className="size-6" />;
      case 'clock':
        return <Clock className="size-6" />;
      case 'router':
        return <Wifi className="size-6" />;
      case 'garland':
      case 'ledStrip':
        return <Sparkles className="size-6" />;
      default:
        return <div className="size-6" />;
    }
  };

  const getColor = () => {
    if (device.status === 'offline') return 'text-gray-400';
    if (device.status === 'inactive') return 'text-gray-500';
    if (device.status === 'on') {
      switch (device.type) {
        case 'light':
        case 'garland':
        case 'ledStrip':
          return 'text-yellow-500';
        case 'socket':
          return 'text-blue-500';
        case 'sensor':
          return 'text-green-500';
        default:
          return 'text-blue-600';
      }
    }
    return 'text-gray-600';
  };

  const getBackgroundColor = () => {
    if (device.status === 'offline') return 'bg-gray-200';
    if (device.status === 'inactive') return 'bg-gray-300';
    if (device.status === 'on') {
      switch (device.type) {
        case 'light':
        case 'garland':
        case 'ledStrip':
          return 'bg-yellow-100';
        case 'socket':
          return 'bg-blue-100';
        case 'sensor':
          return 'bg-green-100';
        default:
          return 'bg-blue-100';
      }
    }
    return 'bg-white';
  };

  const getTooltipContent = () => {
    const content: JSX.Element[] = [];
    
    if (device.type === 'light') {
      if (device.characteristics?.bulbCount) {
        content.push(<p key="bulbs">Ламп: {device.characteristics.bulbCount}</p>);
      }
      if (device.characteristics?.base) {
        content.push(<p key="base">Цоколь: {device.characteristics.base}</p>);
      }
      if (device.characteristics?.wattage) {
        content.push(<p key="wattage">Мощность: {device.characteristics.wattage}W</p>);
      }
    }
    
    if (device.type === 'sensor') {
      if (device.isOnline) {
        if (device.temperature !== undefined) {
          content.push(<p key="temp">Температура: {device.temperature}°C</p>);
        }
        if (device.humidity !== undefined) {
          content.push(<p key="humidity">Влажность: {device.humidity}%</p>);
        }
        if (device.battery !== undefined) {
          content.push(<p key="battery">Заряд: {device.battery}%</p>);
        }
      } else {
        content.push(<p key="offline" className="text-red-600 font-semibold">Датчик офлайн</p>);
      }
    }
    
    if (device.type === 'socket') {
      content.push(<p key="smart">{device.isSmart ? 'Умная розетка' : 'Обычная розетка'}</p>);
      if (device.powerUsage) {
        content.push(<p key="power">Потребление: {device.powerUsage}W</p>);
      }
    }
    
    if (device.type === 'tv') {
      content.push(<p key="smart">{device.isSmart ? 'Smart TV' : 'Обычный TV'}</p>);
    }
    
    return content;
  };

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={`${getBackgroundColor()} ${getColor()} rounded-full p-2 shadow-md cursor-pointer hover:scale-110 transition-transform border-2 border-gray-300`}
            onClick={onClick}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            draggable={draggable}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          >
            {getIcon()}
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <div>
            <p className="font-semibold mb-1">{device.name}</p>
            {getTooltipContent()}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
