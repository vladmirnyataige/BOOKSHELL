import React from "react";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Addbook from "./components/Addbook";
import ListBook from "./components/ListBook";
import Orders from "./components/Orders";
import UsersPage from "./components/UsersPage";
import AdminLogin from "./components/AdminLogin";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

const App = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Routes>
          <Route
            path="/"
            element={
              <AdminProtectedRoute>
                <Addbook />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/list-books"
            element={
              <AdminProtectedRoute>
                <ListBook />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <AdminProtectedRoute>
                <Orders />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <AdminProtectedRoute>
                <UsersPage />
              </AdminProtectedRoute>
            }
          />
          <Route path="/admin/login" element={<AdminLogin />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
