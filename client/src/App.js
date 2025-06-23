import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ReceptionistDash from "./pages/Receptionist/ReceptionistDash";
import PatientAdd from "./pages/Receptionist/PatientAdd";
import BillingAmount from "./pages/Receptionist/BillingAmount";
import DoctorDash from "./pages/Doctor/DoctorDash";
import PatientChecker from "./pages/Doctor/PatientChecker";
import Auth from "./pages/Auth/Auth";
import UserInfo from "./pages/Receptionist/UserInfo";
import UserDocInfo from "./pages/Doctor/UserDocInfo";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Auth />,
    },
    {
      path: "/recept/dashboard",
      element: <ReceptionistDash />,
    },
    {
      path: "/recept/pats",
      element: <PatientAdd />,
    },
    {
      path: "/recept/bill",
      element: <BillingAmount />,
    },
    {
      path: "/doc/dash",
      element: <DoctorDash />,
    },
    {
      path: "/doc/pats",
      element: <PatientChecker />,
    },
    {
      path: "/recept/userinfo",
      element: <UserInfo />,
    },
    {
      path: "/doc/docinfo",
      element: <UserDocInfo />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
