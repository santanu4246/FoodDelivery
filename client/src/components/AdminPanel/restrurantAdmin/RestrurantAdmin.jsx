import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "../../Dashboard/Dashboard.jsx";
import AddFood from "../adminRoutes/AddFood.jsx";
import EditFood from "../adminRoutes/EditFood";
import AddFooditems from "../adminRoutes/AddFooditems.jsx";
import RestrurantDetail from "../adminRoutes/RestrurantDetail";
import { useAdminAuthentication } from "../../../store/Authentication.js";
import { 
  LayoutDashboard, 
  Plus, 
  Edit3, 
  UtensilsCrossed, 
  Store, 
  LogOut, 
  ChefHat,
  Menu,
  X,
  Bell,
  Settings
} from "lucide-react";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAdminAuthentication();
  if (isAuthenticated === false) {
    console.log(isAuthenticated);
    return <Navigate to="/admin" replace />;
  }
  return children;
}

const routesOfAdmin = [
  { name: "Dashboard", path: "", icon: LayoutDashboard },
  { name: "Add Food", path: "/addfood", icon: Plus },
  { name: "Edit Food", path: "/editfood", icon: Edit3 },
  { name: "Food Items", path: "/adddFooditems", icon: UtensilsCrossed },
  { name: "Restaurant Details", path: "/restrurantdetail", icon: Store }
];

function RestrurantAdmin() {
  const location = useLocation();
  const path = location.pathname;
  const { logoutAdmin, admin } = useAdminAuthentication();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile menu overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Admin Panel</h2>
              </div>
            </div>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded-md hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Admin Info */}
          <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Welcome back,</div>
            <div className="font-medium text-gray-800 truncate text-base">
              {admin?.restrurant?.name || "Restaurant Admin"}
            </div>
            <div className="text-xs text-green-600 mt-2 flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              System Online
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {routesOfAdmin.map((item, index) => {
              const IconComponent = item.icon;
              const isActive = path === `/admin${item.path}`;
              
              return (
                <Link key={index} to={`/admin${item.path}`} onClick={() => setSidebarOpen(false)}>
                  <div
                    className={`
                      flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group
                      ${isActive 
                        ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg transform scale-105' 
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:scale-102'
                      }
                    `}
                  >
                    <IconComponent className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'}`} />
                    <span className="font-medium">{item.name}</span>
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Quick Actions */}
          {/* <div className="px-4 py-4 border-t border-gray-100">
            <div className="flex space-x-2">
              <button className="flex-1 p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-4 h-4 mx-auto" />
              </button>
              <button className="flex-1 p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="w-4 h-4 mx-auto" />
              </button>
            </div>
          </div> */}

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={async () => {
                await logoutAdmin();
              }}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:scale-105"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {routesOfAdmin.find(route => path === `/admin${route.path}`)?.name || 'Dashboard'}
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Manage your restaurant efficiently
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* <div className="hidden md:flex items-center space-x-2 px-3 py-2 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-700">All Systems Online</span>
              </div> */}
              
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
                  <Bell className="w-5 h-5" />
                </button>
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {admin?.restrurant?.name?.charAt(0) || "A"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="min-h-full">
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route 
                path="/addfood" 
                element={
                  <ProtectedRoute>
                    <AddFood />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/editfood" 
                element={
                  <ProtectedRoute>
                    <EditFood />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/adddFooditems" 
                element={
                  <ProtectedRoute>
                    <AddFooditems />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/restrurantdetail" 
                element={
                  <ProtectedRoute>
                    <RestrurantDetail />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<Navigate to="/admin" replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

export default RestrurantAdmin;