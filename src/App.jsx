import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from "./Buyer/Layout/DashBoard";
import Viewcar from "./Buyer/Pages/Viewcar";
import Carshow from "./Buyer/Pages/Carshow";
import Wishlist from "./Buyer/Pages/Wishlist";
import "./App.css";
import Login from "./component/Login";
import Ragister from "./component/Ragister";
import Otp from "./component/Otp";
import Forget from "./component/Forget";
import ResetPassword from "./component/ResetPassword";
import Addtocart from "./Buyer/Pages/Addtocart";
import About from "./Buyer/Pages/About";
import Contect from "./Buyer/Pages/Contect";
import Driive from "./Buyer/Pages/Driive";
import Viewoldcar from "./Buyer/Pages/Viewoldcar";
import Oldcarshow from "./Buyer/Pages/Oldcarshow";
import Cars from "./Buyer/Pages/Cars";
import Discover from "./Buyer/Pages/Discover";
import Olddiscover from "./Buyer/Pages/Olddiscover";
// import { useEffect } from "react";
import PrivateRoute from "./component/PrivateRoute";
import Aos from "aos";
import "aos/dist/aos.css";
import NavbarAndDrawer from "./Sellar/layout/NavbarAndDrawer";
import SellarDashboard from "./Sellar/pages/SellarDashboard";
import Herosection from "./Sellar/layout/Herosection";
import Vehicle from "./Sellar/layout/Vehicle";
import Addcar from "./Sellar/pages/Addcar";
import Viewcars from "./Sellar/pages/Viewcars";
import Singlecarpage from "./Sellar/pages/Singlecarpage";
import Message from "./Sellar/pages/Message";
import Editprofile from "./Sellar/pages/Editprofile";
import Changepass from "./Sellar/pages/Changepass";
import Imageinsert from "./Sellar/pages/Imageinsert";
import Edit from "./Sellar/pages/Edit";
import AdminLogin from "./component/AdminLogin";
import AdminDashboard from "./Admin/Pages/AdminDashboard";
import Layout from "./Admin/simlo/Layout";
import RequestTable from "./Admin/simlo/RequestTable";
import Add_new from "./Admin/Pages/Add_new";
import Mulimages from "./Admin/Pages/Mulimages";
import AddAdmin from "./Admin/Pages/AddAdmin";
import CarrequestView from "./Admin/Pages/CarrequestView";
import ViewAdmin from "./Admin/Pages/ViewAdmin";
import BookDrive from "./Admin/Pages/BookDrive";
import ContectFromUser from "./Admin/Pages/ContectFromUser";
import ViewnewPayment from "./Admin/Pages/ViewnewPayment";
import PaymentRemainder from "./Admin/Pages/PaymentRemainder";
import Viewewar from "./Admin/Pages/Viewewar";
import SellarConects from "./Admin/Pages/SellarConects";
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
        <Route path="/admin/login" element={<AdminLogin/>}/>
          <Route path="/admin" element={<Layout />}>
          <Route path="dash" element={<AdminDashboard />} />
          <Route path="add" element={<Add_new/>} />
          <Route path="img/:id" element={<Mulimages/>}/>
          <Route path="add/admin" element={<AddAdmin/>}/>
          <Route path="view/request/sellar" element={<CarrequestView/>}/>
          <Route path="view/admin/list" element={<ViewAdmin/>}/>
          <Route path ="view/Booking/list" element={<BookDrive/>}/>
          <Route path="view/quary/buyer"  element={<ContectFromUser/>}/>
          <Route path="view/new/car/payment"  element={<ViewnewPayment/>}/>
          <Route path="view/newcar" element={<Viewewar/>} />
          <Route path="view/sellar/contect" element={<SellarConects/>}/>
        </Route>
        <Route path="/pay" element={<PaymentRemainder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
