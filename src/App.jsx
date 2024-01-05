import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";

export default function App() {
  //console.log(import.meta.env.VITE_APPWRITE_URL)
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userDataVar) => {
        if (userDataVar) {
          dispatch(login(userDataVar));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if(loading){
    return <h1>Loading ...</h1>
  }
  return <>
    <div className="min-h-screen flex flex-wrap content-between text-white">
      <div className="w-full block">
        <Header/>
        <main>
          todo outlet {/* <Outlet/> */}
        </main>
        <Footer/>
      </div>
    </div>
  </>
}
