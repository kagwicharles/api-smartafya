import { useState, useEffect } from 'react'
import { AppBar, Toolbar } from '@mui/material'


import { displayDesktop, DisplayMobile } from './NavbarOptions';

import '../../static/css/nav.css';
require("@fontsource/roboto");

export default function NavAppBar() {

    const [state, setState] = useState({
        mobileView: false,
        drawerOpen: false
    });
    const { mobileView, drawerOpen } = state;

    useEffect(() => {
        const setResponsiveness = () => {
            return window.innerWidth < 900
                ? setState((prevState) => ({ ...prevState, mobileView: true }))
                : setState((prevState) => ({ ...prevState, mobileView: false }));
        };

        setResponsiveness();
        window.addEventListener("resize", () => setResponsiveness());

        return () => {
            window.removeEventListener("resize", () => setResponsiveness());
        }
    }, []);

    return (
        <header className='header'
            style={{
                fontWeight: "bold"
            }}>
            <AppBar position="fixed"
                className="app-bar"
                elevation={2}
                color="success"
                // sx={{ borderBottom: "1px solid #D9E2EF" }}
            >
                {mobileView ? <DisplayMobile /> : displayDesktop()}
            </AppBar >
            <Toolbar />
        </header>
    );
};