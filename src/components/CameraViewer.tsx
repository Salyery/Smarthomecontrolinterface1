import { Camera, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Device } from '../types/devices';

interface CameraViewerProps {
  cameras: Device[];
  isOpen: boolean;
  onClose: () => void;
}

export function CameraViewer({ cameras, isOpen, onClose }: CameraViewerProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Camera className="size-5" />
            Камеры наблюдения ({cameras.length})
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {cameras.map((camera) => (
            <div key={camera.id} className="border rounded-lg overflow-hidden">
              <div className="bg-gray-900 aspect-video flex items-center justify-center relative">
                <div className="text-center text-white">
                  <Camera className="size-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Прямая трансляция</p>
                  <p className="text-xs opacity-50 mt-1">Видео поток в разработке</p>
                </div>
                <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                  LIVE
                </div>
              </div>
              <div className="p-3 bg-white">
                <p className="font-semibold">{camera.name}</p>
                <p className="text-sm text-gray-500">Статус: {camera.status === 'on' ? 'Активна' : 'Неактивна'}</p>
              </div>
            </div>
          ))}
        </div>

        {cameras.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Camera className="size-16 mx-auto mb-4 opacity-20" />
            <p>Камеры не найдены</p>
          </div>
        )}

        <div className="mt-4 flex justify-end">
          <Button onClick={onClose}>Закрыть</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
