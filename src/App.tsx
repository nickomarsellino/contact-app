import React, { Suspense, lazy, useMemo } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import "./App.css";

import AppRoutes from "./configs/routes";

const client = new ApolloClient({
  uri: "https://wpe-hiring.tokopedia.net/graphql",
  cache: new InMemoryCache(),
});

// templates
const MainTemplate = lazy(() => import("./components/MainTemplate"));

const AppContent = () => {
  const appRouteMemo = useMemo(() => AppRoutes, []);
  const renderContent = () => {
    return (
      <Routes>
        {appRouteMemo.map((route) => (
          <Route
            key={route.id}
            path={route.path}
            element={<route.component />}
          />
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
        <ApolloProvider client={client}>
          <AppContent />
        </ApolloProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
