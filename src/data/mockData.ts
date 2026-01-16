import { Device, WeatherData } from '../types/devices';

// Mock sensor data
export const mockSensors: Device[] = [
  {
    id: 'sensor-1',
    name: 'Датчик гостиной',
    type: 'sensor',
    position: { x: 600, y: 1100 },
    floor: 'first',
    status: 'on',
    temperature: 22.5,
    humidity: 45,
    battery: 85,
    isOnline: true,
  },
  {
    id: 'sensor-2',
    name: 'Датчик спальни',
    type: 'sensor',
    position: { x: 150, y: 900 },
    floor: 'second',
    status: 'on',
    temperature: 21.0,
    humidity: 50,
    battery: 15,
    isOnline: true,
  },
  {
    id: 'sensor-3',
    name: 'Датчик кухни',
    type: 'sensor',
    position: { x: 450, y: 1500 },
    floor: 'first',
    status: 'on',
    temperature: 23.5,
    humidity: 55,
    battery: 60,
    isOnline: true,
  },
  {
    id: 'sensor-4',
    name: 'Датчик улицы 1',
    type: 'sensor',
    position: { x: 0, y: 0 },
    floor: 'first',
    status: 'on',
    temperature: 15.0,
    humidity: 70,
    battery: 40,
    isOnline: true,
  },
  {
    id: 'sensor-5',
    name: 'Датчик улицы 2',
    type: 'sensor',
    position: { x: 0, y: 0 },
    floor: 'first',
    status: 'offline',
    temperature: undefined,
    humidity: undefined,
    battery: 0,
    isOnline: false,
  },
  {
    id: 'sensor-6',
    name: 'Датчик подвала',
    type: 'sensor',
    position: { x: 300, y: 400 },
    floor: 'basement',
    status: 'on',
    temperature: 18.0,
    humidity: 65,
    battery: 90,
    isOnline: true,
  },
];

// Mock lights
export const mockLights: Device[] = [
  {
    id: 'light-1',
    name: 'Свет гостиная',
    type: 'light',
    position: { x: 600, y: 1000 },
    floor: 'first',
    status: 'on',
    isControllable: true,
    characteristics: {
      bulbCount: 3,
      base: 'E27',
      wattage: 60,
    },
  },
  {
    id: 'light-2',
    name: 'Свет кухня',
    type: 'light',
    position: { x: 450, y: 1450 },
    floor: 'first',
    status: 'on',
    isControllable: true,
    characteristics: {
      bulbCount: 2,
      base: 'E14',
      wattage: 40,
    },
  },
  {
    id: 'light-3',
    name: 'Свет спальня 1',
    type: 'light',
    position: { x: 150, y: 950 },
    floor: 'second',
    status: 'off',
    isControllable: true,
    characteristics: {
      bulbCount: 1,
      base: 'E27',
      wattage: 60,
    },
  },
  {
    id: 'light-4',
    name: 'Свет холл',
    type: 'light',
    position: { x: 550, y: 300 },
    floor: 'second',
    status: 'on',
    isControllable: true,
    characteristics: {
      bulbCount: 2,
      base: 'E27',
      wattage: 60,
    },
  },
  {
    id: 'light-5',
    name: 'Свет гараж',
    type: 'light',
    position: { x: 350, y: 400 },
    floor: 'first',
    status: 'off',
    isControllable: false,
    characteristics: {
      bulbCount: 1,
      base: 'E27',
      wattage: 100,
    },
  },
  {
    id: 'light-6',
    name: 'Свет веранда',
    type: 'light',
    position: { x: 1650, y: 1500 },
    floor: 'first',
    status: 'on',
    isControllable: true,
    characteristics: {
      bulbCount: 4,
      base: 'GU10',
      wattage: 35,
    },
  },
];

// Mock sockets
export const mockSockets: Device[] = [
  {
    id: 'socket-1',
    name: 'Розетка гостиная',
    type: 'socket',
    position: { x: 700, y: 1150 },
    floor: 'first',
    status: 'on',
    isSmart: true,
    isControllable: true,
    powerUsage: 150,
  },
  {
    id: 'socket-2',
    name: 'Розетка кухня',
    type: 'socket',
    position: { x: 400, y: 1600 },
    floor: 'first',
    status: 'on',
    isSmart: true,
    isControllable: true,
    powerUsage: 85,
  },
  {
    id: 'socket-3',
    name: 'Розетка спальня',
    type: 'socket',
    position: { x: 200, y: 1000 },
    floor: 'second',
    status: 'off',
    isSmart: true,
    isControllable: true,
    powerUsage: 0,
  },
  {
    id: 'socket-4',
    name: 'Розетка гараж',
    type: 'socket',
    position: { x: 400, y: 600 },
    floor: 'first',
    status: 'on',
    isSmart: false,
    isControllable: false,
  },
];

// Mock cameras
export const mockCameras: Device[] = [
  {
    id: 'camera-1',
    name: 'Камера главный вход',
    type: 'camera',
    position: { x: 900, y: 400 },
    floor: 'first',
    status: 'on',
  },
  {
    id: 'camera-2',
    name: 'Камера гараж',
    type: 'camera',
    position: { x: 350, y: 100 },
    floor: 'first',
    status: 'on',
  },
  {
    id: 'camera-3',
    name: 'Камера веранда',
    type: 'camera',
    position: { x: 1700, y: 1300 },
    floor: 'first',
    status: 'on',
  },
];

// Mock gate
export const mockGate: Device = {
  id: 'gate-1',
  name: 'Ворота',
  type: 'gate',
  position: { x: 0, y: 0 },
  floor: 'first',
  status: 'off',
};

// Mock weather data
export const mockWeather: WeatherData = {
  date: 'завтра',
  temperature: 16,
  condition: 'Переменная облачность',
  humidity: 65,
};

export const allMockDevices: Device[] = [
  ...mockSensors,
  ...mockLights,
  ...mockSockets,
  ...mockCameras,
  mockGate,
];
