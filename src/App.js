import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CategoriesPage from './pages/CategoriesPage';
import ProductPage from './pages/ProductPage';
import Root from './pages/Root';
import SearchPage from './pages/SearchPage';
import AdminCategoriesPage from './pages/admin/AdminCategoriesPage';
import AdminHomePage from './pages/admin/AdminHomePage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminRoot from './pages/admin/AdminRoot';
import { CssBaseline } from '@mui/material';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <CategoriesPage /> },
      { path: 'product', element: <ProductPage /> },
      { path: 'search', element: <SearchPage /> },
      { path: 'admin', element: <AdminHomePage /> },
    ],
  },
  {
    path: '/admin/',
    element: <AdminRoot />,
    children: [
      { index: true, element: <AdminHomePage /> },
      { path: 'categories', element: <AdminCategoriesPage /> },
      { path: 'products', element: <AdminProductsPage /> }
    ],
  },
]);

function App() {
  return (
    <>
      <CssBaseline />
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
