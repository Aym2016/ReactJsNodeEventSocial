import Topbar from "../../components/topbar/Topbar";
import React, { useState } from 'react';
//import Sidebar from "../../components/sidebar/Sidebar";
//import Feed from "../../components/feed/Feed";
//import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css"
import UploadingPdf from "../file/UploadingPdf";
//import Header from "../../components/header/Header";
//import {Footer} from "../../components/footer/Footer";
/*<Sidebar />
        <Feed/>
        <Rightbar/>*/
export default function Home() {
  return (
    <>
    <Topbar/>
      <div className="homeContainer">
        <UploadingPdf/>
        
      </div>
      
    </>
  );
}
