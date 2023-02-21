

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Layout from 'components/Layout';
import ErrorPage from 'pages/Error';
import Invoices from "pages/Invoices";
import Invoice from "pages/Invoices/Invoice";


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Invoices />,
        },
        {
          path: "/invoice/:id",
          element: <Invoice />,
        },
      ]
    },
  ]);
  return (
    <RouterProvider router={router} />

  );
}

export default App;
