// Device types and interfaces for the smart home system

export type DeviceStatus = 'on' | 'off' | 'inactive' | 'offline';

export interface Position {
  x: number;
  y: number;
}

export interface DeviceBase {
  id: string;
  name: string;
  position: Position;
  floor: 'first' | 'second' | 'basement';
  status: DeviceStatus;
}

export interface Light extends DeviceBase {
  type: 'light';
  characteristics?: {
    bulbCount?: number;
    base?: string;
    wattage?: number;
  };
  isControllable: boolean;
}

export interface Sensor extends DeviceBase {
  type: 'sensor';
  temperature?: number;
  humidity?: number;
  battery?: number; // percentage
  isOnline: boolean;
}

export interface Socket extends DeviceBase {
  type: 'socket';
  isSmart: boolean;
  isControllable: boolean;
  powerUsage?: number;
}

export interface TV extends DeviceBase {
  type: 'tv';
  isSmart: boolean;
}

export interface Camera extends DeviceBase {
  type: 'camera';
  streamUrl?: string;
}

export interface ExtensionCord extends DeviceBase {
  type: 'extensionCord';
  points: Position[];
}

export interface Garland extends DeviceBase {
  type: 'garland';
  points: Position[];
  style: 'dotted' | 'ribbon';
  isControllable: boolean;
}

export interface LEDStrip extends DeviceBase {
  type: 'ledStrip';
  points: Position[];
  isControllable: boolean;
}

export interface Clock extends DeviceBase {
  type: 'clock';
}

export interface Router extends DeviceBase {
  type: 'router';
}

export interface Gate extends DeviceBase {
  type: 'gate';
}

export type Device = 
  | Light 
  | Sensor 
  | Socket 
  | TV 
  | Camera 
  | ExtensionCord 
  | Garland 
  | LEDStrip 
  | Clock 
  | Router
  | Gate;

export interface CustomDeviceType {
  id: string;
  name: string;
  icon?: string;
  properties: DeviceProperty[];
}

export interface DeviceProperty {
  id: string;
  name: string;
  type: 'text' | 'number' | 'select';
  options?: string[];
}

export interface WeatherData {
  date: string;
  temperature: number;
  condition: string;
  humidity: number;
}
