import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { Home } from "./pages/Home";

export const AppRouter: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />

          <Route path="/home" element={<Home />} />

          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};
