import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { Home } from "./pages/Home";
import { NewScan } from "./pages/NewScan";
import ScanList from "./pages/ScanList";
import { ScanDetails } from "./pages/ScanDetails";

export const AppRouter = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />

          <Route path="/home" element={<Home />} />

          <Route path="/new-scan" element={<NewScan />} />

          <Route path="/scans" element={<ScanList />} />

          <Route path="/scan/:id" element={<ScanDetails />} />

          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};
