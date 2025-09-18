import React, { useEffect } from "react";
import { fetchUserDetails } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import Navbar from "./Navbar";
import IteamsAdd from "./IteamsAdd";
import AllProduct from "./AllProduct";

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserDetails());
  }, [dispatch]);
  return (
    <div>
      <Navbar />
      <div className="pt-20">
        <IteamsAdd />
        <AllProduct />
      </div>
    </div>
  );
}

export default Home;
