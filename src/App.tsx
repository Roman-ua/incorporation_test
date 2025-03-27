import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import ProtectedRoute from './components/shared/ProtectedRoute';
import Home from './pages/home/Home';
import { ROUTES } from './constants/navigation/routes';
import ProtectedRoutes from './components/shared/ProtectedRoutes';
import RecoveryPass from './pages/recovery/RecoveryPass';
import RecoveryPassConfirm from './pages/recovery/RecoveryPassConfirm';
import CreateCompany from './pages/createCompany/CreateCompany';
import Account from './pages/account/Account';
import Elements from './pages/elements/Elements';
import CompanyPage from './pages/company/CompanyPage';
import Mail from './pages/mail/Mail';
import Documents from './pages/documents/Documents';
import Services from './pages/services/Services';
import Orders from './pages/orders/Orders';
import Invoices from './pages/invoices/Invoices';
import Ein from './pages/EIN/Ein';
import RenderEmails from './pages/emails/Emails';
import ReportPage from './pages/report/ReportPage';
import AnnualReportReview from './pages/report/AnnualReportReview';
import AddFullReportProcess from './pages/report/components/AddFullReportProcess';
import AuthFlow from './pages/login/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<AuthFlow />} />
        <Route path={ROUTES.RECOVERY_PASS} element={<RecoveryPass />} />
        <Route
          path={ROUTES.RECOVERY_PASS_CONFIRM}
          element={<RecoveryPassConfirm />}
        />
        <Route
          path={ROUTES.ANN_REPORT_REVIEW}
          element={<AnnualReportReview />}
        />
        <Route
          path={ROUTES.ANN_REPORT_ADD}
          element={<AddFullReportProcess />}
        />
        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.CREATE_COMPANY} element={<CreateCompany />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/elements" element={<Elements />} />
            <Route path="/emails" element={<RenderEmails />} />
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.MAIL} element={<Mail />} />
            <Route path={ROUTES.DOCUMENTS} element={<Documents />} />
            <Route path={ROUTES.SERVICES} element={<Services />} />
            <Route path={ROUTES.ORDERS} element={<Orders />} />
            <Route path={ROUTES.INVOICES} element={<Invoices />} />
            <Route path={ROUTES.COMPANY} element={<CompanyPage />} />
            <Route path={ROUTES.ACCOUNT} element={<Account />} />
            <Route path={`${ROUTES.REPORT}/:id`} element={<ReportPage />} />
            <Route path={ROUTES.EIN} element={<Ein />} />
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
