import React, { useEffect } from 'react';
import { commonComponents } from '../layout';
import MainContent from './MainContent';

const { NavBar, SlideBar, Footer } = commonComponents;

export default function Home() {

    useEffect(()=>{

        
        document.body.classList.add("sidebar-mini");
        document.body.classList.add("layout-fixed");
        document.body.classList.add("hold-transition");
        
    });

    return (

        <div className="wrapper">
            <NavBar></NavBar>
            <SlideBar></SlideBar>
             <MainContent></MainContent>
            <Footer></Footer> 
        </div>


    );
}
