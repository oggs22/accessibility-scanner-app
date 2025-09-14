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

export const AppRouter = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />

          <Route path="/home" element={<Home />} />

          <Route path="*" element={<Navigate to="/home" replace />} />

          <Route path="/new-scan" element={<NewScan />} />

          <Route path="/scans" element={<ScanList />} />
        </Routes>
      </Layout>
    </Router>
  );
};
