import { Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import TaskDetails from "./pages/TaskDetails";
import Tasks from "./pages/Tasks";
import Trash from "./pages/Trash";
import Users from "./pages/Users";
import Dashboard from "./pages/dashboard";
import { setOpenSidebar } from "./redux/slices/authSlice";
import Register from "./pages/Register";
import Home from "./pages/Home";

function Layout() {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  return user ? (
    <div className="w-full h-screen flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <div className="w-1/5 h-screen bg-white sticky top-0 hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <Navbar />
        <div className="p-4 2xl:px-10">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Home />
  );
}

const MobileSidebar = () => {
  const { isSidebarOpen } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const mobileMenuRef = useRef(null);

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  return (
    <Transition
      show={isSidebarOpen}
      as={Fragment}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0 translate-x-full"
      enterTo="opacity-100 translate-x-0"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100 translate-x-0"
      leaveTo="opacity-0 translate-x-full"
    >
      <div
        ref={mobileMenuRef}
        className="md:hidden fixed inset-0 bg-black/40 z-50 flex transition-transform"
        onClick={closeSidebar}
      >
        <div
          className="bg-white w-3/4 h-full shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full flex justify-end px-5 mt-5">
            <button
              onClick={closeSidebar}
              className="flex justify-end items-end"
            >
              <IoClose size={25} />
            </button>
          </div>
          <div className="-mt-10">
            <Sidebar />
          </div>
        </div>
      </div>
    </Transition>
  );
};

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <main className="w-full min-h-screen bg-[#f3f4f6]">
      <Routes>
      <Route index element={user ? <Navigate to="/dashboard" /> : <Home />}/>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/completed/:status" element={<Tasks />} />
          <Route path="/in-progress/:status" element={<Tasks />} />
          <Route path="/todo/:status" element={<Tasks />} />
          <Route path="/team" element={<Users />} />
          <Route path="/trashed" element={<Trash />} />
          <Route path="/task/:id" element={<TaskDetails />} />
        </Route>
        <Route path="/log-in" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Toast notifications */}
      <Toaster richColors />
    </main>
  );
}

export default App;
