import { useState } from 'react';
import { Lock } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple password check (in real app, this would be secure)
    if (password === 'admin' || password === 'demo') {
      onLogin();
    } else {
      setError('Неверный пароль');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-600 p-4 rounded-full mb-4">
            <Lock className="size-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Умный дом</h1>
          <p className="text-gray-600 mt-2">Добро пожаловать</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Пароль
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              className="w-full"
              autoFocus
            />
            {error && (
              <p className="text-red-600 text-sm mt-2">{error}</p>
            )}
            <p className="text-xs text-gray-500 mt-2">
              Используйте: admin или demo
            </p>
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            Войти
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Панель управления умным домом</p>
        </div>
      </div>
    </div>
  );
}
