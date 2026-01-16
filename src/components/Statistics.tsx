import { BarChart3, TrendingUp, Zap, Droplets } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export function Statistics() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Статистика</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="size-5" />
              Потребление энергии
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <TrendingUp className="size-16 mx-auto mb-4" />
                <p>График будет добавлен позже</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="size-5" />
              История влажности
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <TrendingUp className="size-16 mx-auto mb-4" />
                <p>График будет добавлен позже</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="size-5" />
              Активность устройств
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <TrendingUp className="size-16 mx-auto mb-4" />
                <p>График будет добавлен позже</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="size-5" />
              Температурные зоны
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <TrendingUp className="size-16 mx-auto mb-4" />
                <p>График будет добавлен позже</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          Раздел статистики находится в разработке. Здесь будут отображаться графики потребления энергии, 
          температурные данные, история работы устройств и другие аналитические данные.
        </p>
      </div>
    </div>
  );
}
