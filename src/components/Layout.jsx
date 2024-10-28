import { useState } from 'react'
import { Link, useLocation, Outlet } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { 
  Menu, 
  LogOut, 
  Home, 
  Users, 
  X, 
  Activity, 
  FileText, 
  ClipboardList,
  Camera,
  Settings as SettingsIcon
} from 'lucide-react'
import { cn } from '@/lib/utils'

function Layout() {
  const { logout, user } = useAuth()
  const location = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Users, label: 'Patients', path: '/patients' },
    { icon: Activity, label: 'Monitoring', path: '/monitoring' },
    { icon: FileText, label: 'Investigations', path: '/investigations' },
    { icon: ClipboardList, label: 'Treatments', path: '/treatments' },
    { icon: FileText, label: 'Reports', path: '/reports' },
    { icon: ClipboardList, label: 'Tasks', path: '/tasks' },
    { icon: Camera, label: 'OCR Capture', path: '/ocr' },
    { icon: SettingsIcon, label: 'Settings', path: '/settings' }
  ]

  const isActivePath = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50">
      <div className="absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] bg-fixed"></div>
      <div className="relative">
        {/* Mobile Sidebar */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden fixed top-4 left-4 z-50">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] p-0">
            <div className="h-full flex flex-col bg-card">
              <div className="p-6">
                <h1 className="text-2xl font-bold">EMR System</h1>
                {user && (
                  <p className="text-sm text-gray-500 mt-2">{user.name}</p>
                )}
              </div>
              <Separator />
              <nav className="flex-1 p-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                      isActivePath(item.path) 
                        ? "bg-accent text-accent-foreground" 
                        : "hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
              <Separator />
              <div className="p-4">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2"
                  onClick={() => logout()}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop Sidebar */}
        <div className={cn(
          "fixed inset-y-0 z-50 hidden md:flex flex-col transition-all duration-300",
          isSidebarOpen ? "w-[240px]" : "w-[70px]"
        )}>
          <div className="flex-1 flex flex-col bg-card border-r">
            <div className="flex h-16 items-center justify-between px-4">
              {isSidebarOpen && (
                <div>
                  <h1 className="text-xl font-semibold">EMR System</h1>
                  {user && (
                    <p className="text-sm text-gray-500">{user.name}</p>
                  )}
                </div>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                {isSidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
            <Separator />
            <nav className="flex-1 p-2">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    isActivePath(item.path)
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-accent hover:text-accent-foreground",
                    !isSidebarOpen && "justify-center px-2"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {isSidebarOpen && <span>{item.label}</span>}
                </Link>
              ))}
            </nav>
            <Separator />
            <div className="p-4">
              <Button
                variant="ghost"
                className={cn(
                  "w-full gap-2",
                  isSidebarOpen ? "justify-start" : "justify-center px-0"
                )}
                onClick={() => logout()}
              >
                <LogOut className="h-4 w-4" />
                {isSidebarOpen && <span>Logout</span>}
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className={cn(
          "min-h-screen transition-all duration-300 relative",
          isSidebarOpen ? "md:pl-[240px]" : "md:pl-[70px]"
        )}>
          <main className="container py-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}

export default Layout
