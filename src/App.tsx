import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Login from './pages/login/Login';
import ProtectedRoute from './components/shared/ProtectedRoute';
import Home from './pages/home/Home';
import { ROUTES } from './constants/navigation/routes';
import ProtectedRoutes from './components/shared/ProtectedRoutes';
import RecoveryPass from './pages/recovery/RecoveryPass';
import RecoveryPassConfirm from './pages/recovery/RecoveryPassConfirm';
import CreateCompany from './pages/createCompany/CreateCompany';

function App() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.RECOVERY_PASS} element={<RecoveryPass />} />
        <Route
          path={ROUTES.RECOVERY_PASS_CONFIRM}
          element={<RecoveryPassConfirm />}
        />
        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.CREATE_COMPANY} element={<CreateCompany />} />
          <Route element={<ProtectedRoutes />}>
            <Route path={ROUTES.HOME} element={<Home />} />
          </Route>
        </Route>
        <Route
          path={ROUTES.REDIRECT}
          element={<Navigate to={ROUTES.LOGIN} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
