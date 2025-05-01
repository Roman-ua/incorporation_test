import React, { useEffect } from 'react';
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
import RecoverPasswordPage from './pages/login/RecoverPAsswordPage';
import PersonPageDetails from './pages/person/PersonPageDetails';
import People from './pages/people/People';
import AddPersonProcess from './pages/person/processes/addPersonProcess/AddPersonProcess';
import { Toaster } from 'sonner';
import { useRecoilValue } from 'recoil';
import ThemeState from './state/atoms/Theme';
import ElementsButtons from './pages/elements/nested/ElementsButtons';
import ElementsNotions from './pages/elements/nested/ElementsNotions';
import ElementsAddress from './pages/elements/nested/ElementsAddress';

function App() {
  const theme = useRecoilValue(ThemeState);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.log('tut');
      try {
        // fetch('https://api.incorporatenow.com/api/user/auth0/authorize/').then(
        //   (res) => {
        //     const data = res.json();
        //     console.log(data);
        //   }
        // );
      } catch (e) {
        console.log(e);
      }
    }
  }, []);

  return (
    <>
      <Toaster richColors theme={theme.theme} />
      <Router>
        <Routes>
          <Route
            path={ROUTES.RECOVERY_PASS}
            element={<RecoverPasswordPage />}
          />
          <Route path={ROUTES.LOGIN} element={<AuthFlow />} />

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
          <Route path={ROUTES.ADD_PERSON} element={<AddPersonProcess />} />
          <Route element={<ProtectedRoute />}>
            <Route path={ROUTES.CREATE_COMPANY} element={<CreateCompany />} />
            <Route element={<ProtectedRoutes />}>
              <Route path={ROUTES.ELEMENTS} element={<Elements />} />
              <Route
                path={ROUTES.ELEMENTS_BUTTONS}
                element={<ElementsButtons />}
              />
              <Route
                path={ROUTES.ELEMENTS_NOTIONS}
                element={<ElementsNotions />}
              />
              <Route
                path={ROUTES.ELEMENTS_ADDRESS}
                element={<ElementsAddress />}
              />
              <Route path={ROUTES.EMAILS} element={<RenderEmails />} />
              <Route path={ROUTES.HOME} element={<Home />} />
              <Route path={ROUTES.MAIL} element={<Mail />} />
              <Route path={ROUTES.DOCUMENTS} element={<Documents />} />
              <Route path={ROUTES.SERVICES} element={<Services />} />
              <Route path={ROUTES.ORDERS} element={<Orders />} />
              <Route path={ROUTES.INVOICES} element={<Invoices />} />
              <Route path={ROUTES.COMPANY} element={<CompanyPage />} />
              <Route path={ROUTES.ACCOUNT} element={<Account />} />
              <Route path={ROUTES.PEOPLE} element={<People />} />
              <Route path={`${ROUTES.REPORT}/:id`} element={<ReportPage />} />
              <Route
                path={`${ROUTES.PERSON}/:id`}
                element={<PersonPageDetails />}
              />
              <Route path={ROUTES.EIN} element={<Ein />} />
            </Route>
          </Route>
          <Route
            path={ROUTES.REDIRECT}
            element={<Navigate to={ROUTES.LOGIN} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
