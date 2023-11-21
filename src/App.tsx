import React, { Suspense, lazy, useMemo } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import "./App.css";

import AppRoutes from "./configs/routes";

// templates
const MainTemplate = lazy(() => import("./components/MainTemplate"));

const AppContent = () => {
  const appRouteMemo = useMemo(() => AppRoutes, []);
  const renderContent = () => {
    return (
      <Routes>
      {appRouteMemo.map((route) => (
        <Route key={route.id} path={route.path} element={<route.component />} />
      ))}
    </Routes>
    );
  };

  return (
    <Suspense>
      <MainTemplate>{renderContent()}</MainTemplate>
    </Suspense>
  );
};

const App = () => {
  return (
    <>
      <BrowserRouter>
          <AppContent />
      </BrowserRouter>
    </>
  );
};

export default App;
