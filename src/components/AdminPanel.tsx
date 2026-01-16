import { useState } from 'react';
import { Plus, Trash2, Edit, Upload, Save } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Device, CustomDeviceType, DeviceProperty } from '../types/devices';
import { toast } from 'sonner@2.0.3';

interface AdminPanelProps {
  devices: Device[];
  onAddDevice: (device: Device) => void;
  onRemoveDevice: (deviceId: string) => void;
}

export function AdminPanel({ devices, onAddDevice, onRemoveDevice }: AdminPanelProps) {
  const [customDeviceTypes, setCustomDeviceTypes] = useState<CustomDeviceType[]>([]);
  const [selectedDevices, setSelectedDevices] = useState<Set<string>>(new Set());
  const [isCreatingDeviceType, setIsCreatingDeviceType] = useState(false);
  const [newDeviceType, setNewDeviceType] = useState<Partial<CustomDeviceType>>({
    name: '',
    properties: [],
  });

  // Mock smart devices from "Ali" (AliExpress)
  const smartDevicesFromAli = [
    { id: 'ali-1', name: 'Умная лампочка Yeelight', type: 'light' },
    { id: 'ali-2', name: 'Датчик температуры Xiaomi', type: 'sensor' },
    { id: 'ali-3', name: 'Умная розетка Gosund', type: 'socket' },
    { id: 'ali-4', name: 'WiFi камера Sonoff', type: 'camera' },
    { id: 'ali-5', name: 'Умная лампа RGB', type: 'light' },
  ];

  const handleDeviceSelection = (deviceId: string) => {
    const newSelection = new Set(selectedDevices);
    if (newSelection.has(deviceId)) {
      newSelection.delete(deviceId);
    } else {
      newSelection.add(deviceId);
    }
    setSelectedDevices(newSelection);
  };

  const handleAddSelectedToFloorPlan = () => {
    if (selectedDevices.size === 0) {
      toast.error('Выберите хотя бы одно устройство');
      return;
    }

    selectedDevices.forEach((deviceId) => {
      const smartDevice = smartDevicesFromAli.find(d => d.id === deviceId);
      if (smartDevice) {
        const newDevice: Device = {
          id: `device-${Date.now()}-${Math.random()}`,
          name: smartDevice.name,
          type: smartDevice.type as any,
          position: { x: 500, y: 500 },
          floor: 'first',
          status: 'off',
          isControllable: true,
        } as Device;

        onAddDevice(newDevice);
      }
    });

    toast.success(`Добавлено устройств: ${selectedDevices.size}`);
    setSelectedDevices(new Set());
  };

  const handleCreateCustomDeviceType = () => {
    if (!newDeviceType.name) {
      toast.error('Введите название типа устройства');
      return;
    }

    const deviceType: CustomDeviceType = {
      id: `custom-${Date.now()}`,
      name: newDeviceType.name,
      icon: newDeviceType.icon,
      properties: newDeviceType.properties || [],
    };

    setCustomDeviceTypes([...customDeviceTypes, deviceType]);
    setIsCreatingDeviceType(false);
    setNewDeviceType({ name: '', properties: [] });
    toast.success('Пользовательский тип устройства создан');
  };

  const addProperty = () => {
    setNewDeviceType({
      ...newDeviceType,
      properties: [
        ...(newDeviceType.properties || []),
        { id: `prop-${Date.now()}`, name: '', type: 'text' },
      ],
    });
  };

  const updateProperty = (index: number, field: keyof DeviceProperty, value: any) => {
    const properties = [...(newDeviceType.properties || [])];
    properties[index] = { ...properties[index], [field]: value };
    setNewDeviceType({ ...newDeviceType, properties });
  };

  const removeProperty = (index: number) => {
    const properties = [...(newDeviceType.properties || [])];
    properties.splice(index, 1);
    setNewDeviceType({ ...newDeviceType, properties });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Панель администратора</h2>
        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
          Режим администратора
        </Badge>
      </div>

      {/* Smart Devices from Ali */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Умные устройства с AliExpress</span>
            <Button 
              onClick={handleAddSelectedToFloorPlan}
              disabled={selectedDevices.size === 0}
            >
              <Plus className="size-4 mr-2" />
              Добавить на план ({selectedDevices.size})
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {smartDevicesFromAli.map((device) => (
              <div 
                key={device.id}
                className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50"
              >
                <Checkbox
                  checked={selectedDevices.has(device.id)}
                  onCheckedChange={() => handleDeviceSelection(device.id)}
                />
                <div className="flex-1">
                  <p className="font-medium">{device.name}</p>
                  <p className="text-sm text-gray-500">Тип: {device.type}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Custom Device Types */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Пользовательские типы устройств</span>
            <Dialog open={isCreatingDeviceType} onOpenChange={setIsCreatingDeviceType}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="size-4 mr-2" />
                  Создать тип
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Создать пользовательский тип устройства</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="deviceTypeName">Название типа</Label>
                    <Input
                      id="deviceTypeName"
                      value={newDeviceType.name || ''}
                      onChange={(e) => setNewDeviceType({ ...newDeviceType, name: e.target.value })}
                      placeholder="Например: Умный термостат"
                    />
                  </div>

                  <div>
                    <Label htmlFor="deviceTypeIcon">Иконка (URL)</Label>
                    <div className="flex gap-2">
                      <Input
                        id="deviceTypeIcon"
                        value={newDeviceType.icon || ''}
                        onChange={(e) => setNewDeviceType({ ...newDeviceType, icon: e.target.value })}
                        placeholder="URL иконки или оставьте пустым"
                      />
                      <Button variant="outline">
                        <Upload className="size-4" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>Свойства устройства</Label>
                      <Button size="sm" variant="outline" onClick={addProperty}>
                        <Plus className="size-4 mr-2" />
                        Добавить свойство
                      </Button>
                    </div>

                    <div className="space-y-3">
                      {(newDeviceType.properties || []).map((prop, index) => (
                        <Card key={prop.id}>
                          <CardContent className="pt-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              <div>
                                <Label className="text-xs">Название</Label>
                                <Input
                                  value={prop.name}
                                  onChange={(e) => updateProperty(index, 'name', e.target.value)}
                                  placeholder="Название свойства"
                                  size={1}
                                />
                              </div>
                              <div>
                                <Label className="text-xs">Тип</Label>
                                <Select
                                  value={prop.type}
                                  onValueChange={(value) => updateProperty(index, 'type', value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="text">Текст</SelectItem>
                                    <SelectItem value="number">Число</SelectItem>
                                    <SelectItem value="select">Список</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="flex items-end gap-2">
                                {prop.type === 'select' && (
                                  <Input
                                    value={prop.options?.join(', ') || ''}
                                    onChange={(e) => updateProperty(index, 'options', e.target.value.split(',').map(s => s.trim()))}
                                    placeholder="Значения через запятую"
                                    className="flex-1"
                                  />
                                )}
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => removeProperty(index)}
                                >
                                  <Trash2 className="size-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsCreatingDeviceType(false)}>
                      Отмена
                    </Button>
                    <Button onClick={handleCreateCustomDeviceType}>
                      <Save className="size-4 mr-2" />
                      Создать
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {customDeviceTypes.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              Пользовательские типы устройств не созданы
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {customDeviceTypes.map((deviceType) => (
                <Card key={deviceType.id}>
                  <CardHeader>
                    <CardTitle className="text-base">{deviceType.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-2">
                      Свойств: {deviceType.properties.length}
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Edit className="size-4 mr-2" />
                        Изменить
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          setCustomDeviceTypes(customDeviceTypes.filter(t => t.id !== deviceType.id));
                          toast.success('Тип устройства удален');
                        }}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Current Devices */}
      <Card>
        <CardHeader>
          <CardTitle>Текущие устройства на планах</CardTitle>
        </CardHeader>
        <CardContent>
          {devices.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              Устройства не добавлены
            </p>
          ) : (
            <div className="space-y-2">
              {devices.map((device) => (
                <div 
                  key={device.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">{device.name}</p>
                    <p className="text-sm text-gray-500">
                      Тип: {device.type} | Этаж: {device.floor} | Позиция: ({device.position.x}, {device.position.y})
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => {
                      onRemoveDevice(device.id);
                      toast.success('Устройство удалено');
                    }}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold mb-2">Инструкция по работе в режиме администратора:</h3>
        <ul className="text-sm space-y-1 text-blue-800 list-disc list-inside">
          <li>Выберите устройства из списка AliExpress и добавьте их на план</li>
          <li>Создавайте пользовательские типы устройств с собственными свойствами</li>
          <li>Перетаскивайте устройства на планах этажей для изменения их позиции</li>
          <li>Для рисования проводов, удлинителей и гирлянд перейдите на вкладку "Планы этажей"</li>
        </ul>
      </div>
    </div>
  );
}
