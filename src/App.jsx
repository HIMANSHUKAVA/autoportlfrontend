import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import DashBoard from "./Buyer/Layout/DashBoard";
import About from "./Buyer/Pages/About";
import Addtocart from "./Buyer/Pages/Addtocart";
import Cars from "./Buyer/Pages/Cars";
import Carshow from "./Buyer/Pages/Carshow";
import Contect from "./Buyer/Pages/Contect";
import Discover from "./Buyer/Pages/Discover";
import Driive from "./Buyer/Pages/Driive";
import Oldcarshow from "./Buyer/Pages/Oldcarshow";
import Olddiscover from "./Buyer/Pages/Olddiscover";
import Viewcar from "./Buyer/Pages/Viewcar";
import Viewoldcar from "./Buyer/Pages/Viewoldcar";
import Wishlist from "./Buyer/Pages/Wishlist";
import Forget from "./component/Forget";
import Login from "./component/Login";
import Otp from "./component/Otp";
import Ragister from "./component/Ragister";
import ResetPassword from "./component/ResetPassword";
// import { useEffect } from "react";
import "aos/dist/aos.css";
import AddAdmin from "./Admin/Pages/AddAdmin";
import Add_new from "./Admin/Pages/Add_new";
import AdminDashboard from "./Admin/Pages/AdminDashboard";
import BookDrive from "./Admin/Pages/BookDrive";
import CarrequestView from "./Admin/Pages/CarrequestView";
import ContectFromUser from "./Admin/Pages/ContectFromUser";
import EditAdminProfile from "./Admin/Pages/EditAdminProfile";
import Mulimages from "./Admin/Pages/Mulimages";
import OldCarPayment from "./Admin/Pages/OldCarPayment";
import OldCarPaymentRemainder from "./Admin/Pages/OldCarPaymentRemainder";
import PaymentRemainder from "./Admin/Pages/PaymentRemainder";
import SellarConects from "./Admin/Pages/SellarConects";
import ViewAdmin from "./Admin/Pages/ViewAdmin";
import Viewewar from "./Admin/Pages/Viewewar";
import ViewnewPayment from "./Admin/Pages/ViewnewPayment";
import Layout from "./Admin/simlo/Layout";
import Addcar from "./Sellar/pages/Addcar";
import Changepass from "./Sellar/pages/Changepass";
import Edit from "./Sellar/pages/Edit";
import Editprofile from "./Sellar/pages/Editprofile";
import Imageinsert from "./Sellar/pages/Imageinsert";
import Message from "./Sellar/pages/Message";
import SellarDashboard from "./Sellar/pages/SellarDashboard";
import Singlecarpage from "./Sellar/pages/Singlecarpage";
import Viewcars from "./Sellar/pages/Viewcars";
import AdminLogin from "./component/AdminLogin";
import PrivateRoute from "./component/PrivateRoute";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🔓 Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/ragister" element={<Ragister />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/forget" element={<Forget />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/*  Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashBoard />
            </PrivateRoute>
          }
        />

        <Route
          path="/viewcars"
          element={
            <PrivateRoute>
              <Viewcar />
            </PrivateRoute>
          }
        />

        <Route
          path="/carshow/:id"
          element={
            <PrivateRoute>
              <Carshow />
            </PrivateRoute>
          }
        />

        <Route
          path="/wishlist"
          element={
            <PrivateRoute>
              <Wishlist />
            </PrivateRoute>
          }
        />

        <Route
          path="/add-to-cart"
          element={
            <PrivateRoute>
              <Addtocart />
            </PrivateRoute>
          }
        />

        <Route
          path="/about"
          element={
            <PrivateRoute>
              <About />
            </PrivateRoute>
          }
        />

        <Route
          path="/contect"
          element={
            <PrivateRoute>
              <Contect />
            </PrivateRoute>
          }
        />

        <Route
          path="/drive/:id"
          element={
            <PrivateRoute>
              <Driive />
            </PrivateRoute>
          }
        />

        <Route
          path="/viewoldcar"
          element={
            <PrivateRoute>
              <Viewoldcar />
            </PrivateRoute>
          }
        />

        <Route
          path="/oldcarshow/:id"
          element={
            <PrivateRoute>
              <Oldcarshow />
            </PrivateRoute>
          }
        />

        <Route
          path="/cars"
          element={
            <PrivateRoute>
              <Cars />
            </PrivateRoute>
          }
        />

        <Route
          path="/discovernewcar"
          element={
            <PrivateRoute>
              <Discover />
            </PrivateRoute>
          }
        />

        <Route
          path="/oldcardisover"
          element={
            <PrivateRoute>
              <Olddiscover />
            </PrivateRoute>
          }
        />
        <Route
          path="/sellardashboard"
          element={
            <PrivateRoute>
              <SellarDashboard />
            </PrivateRoute>
          }
        />
        <Route path="/addcar" element={<Addcar />} />
        <Route
          path="/viewcar"
          element={
            <PrivateRoute>
              <Viewcars />
            </PrivateRoute>
          }
        />

        <Route
          path="/singlepage/:id"
          element={
            <PrivateRoute>
              <Singlecarpage />
            </PrivateRoute>
          }
        />

        <Route
          path="/message"
          element={
            <PrivateRoute>
              <Message />
            </PrivateRoute>
          }
        />

        <Route
          path="/editprofile/:id"
          element={
            <PrivateRoute>
              <Editprofile />
            </PrivateRoute>
          }
        />

        <Route
          path="/changepass"
          element={
            <PrivateRoute>
              <Changepass />
            </PrivateRoute>
          }
        />

        <Route
          path="/img/:id"
          element={
            <PrivateRoute>
              <Imageinsert />
            </PrivateRoute>
          }
        />

        <Route
          path="/edit/:id"
          element={
            <PrivateRoute>
              <Edit />
            </PrivateRoute>
          }
        />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<Layout />}>
          <Route path="dash" element={<AdminDashboard />} />
          <Route path="add" element={<Add_new />} />
          <Route path="img/:id" element={<Mulimages />} />
          <Route path="add/admin" element={<AddAdmin />} />
          <Route path="view/request/sellar" element={<CarrequestView />} />
          <Route path="view/admin/list" element={<ViewAdmin />} />
          <Route path="view/Booking/list" element={<BookDrive />} />
          <Route path="view/quary/buyer" element={<ContectFromUser />} />
          <Route path="view/new/car/payment" element={<ViewnewPayment />} />
          <Route path="view/newcar" element={<Viewewar />} />
          <Route path="view/sellar/contect" element={<SellarConects />} />
          <Route
            path="edit/admins/profile/:id"
            element={<EditAdminProfile />}
          />
          <Route path="view/oldcar/payments" element={<OldCarPayment />} />
        </Route>
        <Route path="/pay" element={<PaymentRemainder />} />
        <Route path="/oldpay" element={<OldCarPaymentRemainder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
