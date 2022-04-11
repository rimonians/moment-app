import React, { useEffect } from "react";
import classes from "./App.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Signin from "./pages/Signin/Signin";
import Signup from "./pages/Signup/Signup";
import Moment from "./pages/Moment/Moment";
import NotFound from "./pages/NotFound/NotFound";
import PrivateOutlet from "./components/PrivateOutlet/PrivateOutlet";
import { useSelector, useDispatch } from "react-redux";
import { authExistenceInitiate } from "./redux/auth/authActions";
import { momentGetInitiate } from "./redux/moment/momentActions";

const App = () => {
  const authState = useSelector((state) => state.auth);
  const { loading, user } = authState;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authExistenceInitiate());
  }, [dispatch]);

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      dispatch(momentGetInitiate(user.uid));
    }
  }, [dispatch, user]);

  return (
    <BrowserRouter>
      {loading && (
        <div className={classes.loadingContainer}>
          <div className={classes.loading}></div>
        </div>
      )}
      {!loading && (
        <>
          <Layout>
            <Routes>
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/*" element={<PrivateOutlet />}>
                <Route path="" element={<Home />} />
                <Route path="moment" element={<Moment />} />
              </Route>
            </Routes>
          </Layout>
          <ToastContainer
            position="bottom-right"
            autoClose={2000}
            hideProgressBar={false}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </>
      )}
    </BrowserRouter>
  );
};

export default App;
