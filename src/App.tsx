import { useState } from "react";
import { Bell, Settings, User, Home } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./components/ui/tabs";
import { Button } from "./components/ui/button";
import { Switch } from "./components/ui/switch";
import { Label } from "./components/ui/label";
import { LoginPage } from "./components/LoginPage";
import { Dashboard } from "./components/Dashboard";
import { FloorPlans } from "./components/FloorPlans";
import { Statistics } from "./components/Statistics";
import { AdminPanel } from "./components/AdminPanel";
import { CameraViewer } from "./components/CameraViewer";
import { allMockDevices } from "./data/mockData";
import { Device } from "./types/devices";
import { Toaster, toast } from "sonner@2.0.3";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [devices, setDevices] =
    useState<Device[]>(allMockDevices);
  const [isCameraViewerOpen, setIsCameraViewerOpen] =
    useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
    toast.success("Вход выполнен успешно");
  };

  const handleDeviceToggle = (deviceId: string) => {
    setDevices((prevDevices) =>
      prevDevices.map((device) => {
        if (device.id === deviceId) {
          const newStatus =
            device.status === "on" ? "off" : "on";
          return { ...device, status: newStatus };
        }
        return device;
      }),
    );
  };

  const handleDeviceMove = (
    deviceId: string,
    newPosition: { x: number; y: number },
  ) => {
    setDevices((prevDevices) =>
      prevDevices.map((device) => {
        if (device.id === deviceId) {
          return { ...device, position: newPosition };
        }
        return device;
      }),
    );
  };

  const handleAddDevice = (device: Device) => {
    setDevices([...devices, device]);
  };

  const handleRemoveDevice = (deviceId: string) => {
    setDevices(devices.filter((d) => d.id !== deviceId));
  };

  const handleOpenGate = () => {
    const gate = devices.find((d) => d.type === "gate");
    if (gate) {
      handleDeviceToggle(gate.id);
      toast.success("Ворота открываются...");
      setTimeout(() => {
        handleDeviceToggle(gate.id);
        toast.info("Ворота закрыты");
      }, 5000);
    }
  };

  const handleViewCameras = () => {
    const cameras = devices.filter((d) => d.type === "camera");
    if (cameras.length > 0) {
      setIsCameraViewerOpen(true);
    } else {
      toast.info(
        `Доступно камер: ${cameras.length}. Просмотр камер в разработке.`,
      );
    }
  };

  const toggleAdminMode = () => {
    setIsAdminMode(!isAdminMode);
    if (!isAdminMode) {
      setActiveTab("admin");
      toast.info("Режим администратора активирован");
    } else {
      setActiveTab("dashboard");
      toast.info("Режим демо активирован");
    }
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" richColors />

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center gap-2 md:gap-3">
              <div className="bg-blue-600 p-1.5 md:p-2 rounded-lg">
                <Home className="size-5 md:size-6 text-white" />
              </div>
              <div>
                <h1 className="text-base md:text-xl font-bold text-gray-900">
                  Smart Home Control
                </h1>
                <p className="text-xs md:text-sm text-gray-600 hidden sm:block">
                  Добро пожаловать, Пользователь
                </p>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Admin Mode Toggle */}
              <div className="flex items-center gap-1.5 md:gap-2 bg-gray-100 px-2 md:px-3 py-1.5 md:py-2 rounded-lg">
                <Label
                  htmlFor="admin-mode"
                  className="text-xs md:text-sm cursor-pointer"
                >
                  {isAdminMode ? "Админ" : "Демо"}
                </Label>
                <Switch
                  id="admin-mode"
                  checked={isAdminMode}
                  onCheckedChange={toggleAdminMode}
                />
              </div>

              <div className="hidden sm:flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Bell className="size-5" />
                </Button>

                <Button variant="ghost" size="icon">
                  <Settings className="size-5" />
                </Button>

                <Button variant="ghost" size="icon">
                  <User className="size-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {isAdminMode ? (
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="bg-white border-b border-gray-200">
              <div className="px-6">
                <TabsList className="h-12">
                  <TabsTrigger value="admin">
                    Управление устройствами
                  </TabsTrigger>
                  <TabsTrigger value="floorplans">
                    Планы этажей
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>

            <TabsContent value="admin" className="mt-0">
              <AdminPanel
                devices={devices}
                onAddDevice={handleAddDevice}
                onRemoveDevice={handleRemoveDevice}
              />
            </TabsContent>

            <TabsContent value="floorplans" className="mt-0">
              <FloorPlans
                devices={devices}
                onDeviceToggle={handleDeviceToggle}
                isAdminMode={isAdminMode}
                onDeviceMove={handleDeviceMove}
              />
            </TabsContent>
          </Tabs>
        ) : (
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="bg-white border-b border-gray-200">
              <div className="px-6">
                <TabsList className="h-12">
                  <TabsTrigger value="dashboard">
                    Панель управления
                  </TabsTrigger>
                  <TabsTrigger value="floorplans">
                    Планы этажей
                  </TabsTrigger>
                  <TabsTrigger value="statistics">
                    Статистика
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>

            <TabsContent value="dashboard" className="mt-0">
              <Dashboard
                devices={devices}
                onDeviceToggle={handleDeviceToggle}
                onOpenGate={handleOpenGate}
                onViewCameras={handleViewCameras}
              />
            </TabsContent>

            <TabsContent value="floorplans" className="mt-0">
              <FloorPlans
                devices={devices}
                onDeviceToggle={handleDeviceToggle}
                isAdminMode={isAdminMode}
              />
            </TabsContent>

            <TabsContent value="statistics" className="mt-0">
              <Statistics />
            </TabsContent>
          </Tabs>
        )}
      </main>

      {/* Camera Viewer */}
      {isCameraViewerOpen && (
        <CameraViewer
          cameras={devices.filter((d) => d.type === "camera")}
          isOpen={isCameraViewerOpen}
          onClose={() => setIsCameraViewerOpen(false)}
        />
      )}
    </div>
  );
}