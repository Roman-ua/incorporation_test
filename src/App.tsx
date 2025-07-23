import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/shared/ProtectedRoute';
import { ROUTES } from './constants/navigation/routes';
import ProtectedRoutes from './components/shared/ProtectedRoutes';
import RecoveryPassConfirm from './pages/recovery/RecoveryPassConfirm';
import CreateCompany from './pages/createCompany/CreateCompany';
import AccountPage from './pages/account/Account';
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
import PersonPageDetails from './pages/person/PersonPageDetails';
import People from './pages/people/People';
import AddPersonProcess from './pages/person/processes/addPersonProcess/AddPersonProcess';
import { Toaster } from 'sonner';
import { useRecoilValue } from 'recoil';
import ThemeState from './state/atoms/Theme';
import ElementsButtons from './pages/elements/nested/ElementsButtons';
import ElementsNotions from './pages/elements/nested/ElementsNotions';
import ElementsAddress from './pages/elements/nested/ElementsAddress';

import AuthWrapper from './components/root/AuthWrapper';
import RedirectPage from './pages/redirect/Redirect';
import Users from './pages/Internal/Users/Users';
import SidebarLayoutWorkspaces from './components/shared/SidebarLayoutWorkspaces';
import SidebarLayoutAdmin from './components/shared/SideBarLayoutAdmin';

import WorkspacesPage from './pages/workspaces/WorkspacesPage';
import Companies from './pages/Internal/Companies/Companies';

function App() {
  const theme = useRecoilValue(ThemeState);

  useEffect(() => {
    localStorage.removeItem('finalFormData');
    localStorage.removeItem('multistep-form-data');
    localStorage.removeItem('confetti_success');

    const token = localStorage.getItem('token');
    fetch('https://api.incorporatenow.com/api/user/auth0/exchange-token/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token:
          '9PYVQkrmutQ03gAM_ROvX9ficXV_Xp3NcXgDRgrlh5w1o14YUL0gXYrZbbBN2qMPYYGEOVcEIcORztZM3mmU-A',
      }),
    }).then((res) => {
      const data = res.json();
      console.log(data);
    });
    if (!token) {
      try {
        // window.location.replace(
        //   'https://api.incorporatenow.com/api/user/auth0/authorize/'
        // );
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
      <Toaster theme={theme.theme} />
      <Router>
        <AuthWrapper>
          <Routes>
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
            <Route element={<SidebarLayoutAdmin />}>
              <Route path={ROUTES.INTERNAL_COMPANIES} element={<Companies />} />
              <Route path={ROUTES.INTERNAL_USERS} element={<Users />} />
              <Route path={ROUTES.INTERNAL_MAIL} element={<Mail />} />
              <Route path={ROUTES.INTERNAL_DOCUMENTS} element={<Documents />} />
              <Route path={ROUTES.INTERNAL_SERVICES} element={<Services />} />
              <Route path={ROUTES.INTERNAL_ORDERS} element={<Orders />} />
              <Route path={ROUTES.INTERNAL_INVOICES} element={<Invoices />} />
              <Route
                path={`${ROUTES.INTERNAL_ACCOUNT}/:id`}
                element={<AccountPage />}
              />
            </Route>
            <Route element={<SidebarLayoutWorkspaces />}>
              <Route path={ROUTES.WORKSPACES} element={<WorkspacesPage />} />
              <Route path={ROUTES.ALL_USERS} element={<Users />} />
              <Route path={ROUTES.ALL_MAIL} element={<Mail />} />
              <Route path={ROUTES.ALL_DOCUMENTS} element={<Documents />} />
              <Route path={ROUTES.ALL_SERVICES} element={<Services />} />
              <Route path={ROUTES.ALL_ORDERS} element={<Orders />} />
              <Route path={ROUTES.ALL_INVOICES} element={<Invoices />} />
              <Route
                path={`${ROUTES.ALL_ACCOUNT}/:id`}
                element={<AccountPage />}
              />
            </Route>
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
                <Route path={ROUTES.MAIL} element={<Mail />} />
                <Route path={ROUTES.DOCUMENTS} element={<Documents />} />
                <Route path={ROUTES.SERVICES} element={<Services />} />
                <Route path={ROUTES.ORDERS} element={<Orders />} />
                <Route path={ROUTES.INVOICES} element={<Invoices />} />
                <Route path={`${ROUTES.HOME}/:id`} element={<CompanyPage />} />
                <Route
                  path={`${ROUTES.ACCOUNT}/:id`}
                  element={<AccountPage />}
                />
                <Route path={ROUTES.PEOPLE} element={<People />} />
                <Route path={`${ROUTES.REPORT}/:id`} element={<ReportPage />} />
                <Route
                  path={`${ROUTES.PERSON}/:id`}
                  element={<PersonPageDetails />}
                />
                <Route path={`${ROUTES.EIN}/:id/:ein`} element={<Ein />} />
              </Route>
            </Route>
            <Route path={ROUTES.REDIRECT} element={<RedirectPage />} />
          </Routes>
        </AuthWrapper>
      </Router>
    </>
  );
}

export default App;
