import { useState } from 'react';
import { Toolbar, IconButton, Drawer, MenuItem, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';

import smartAfyaLogo from './NavLogo'
import getMenuButtons from './MenuOptions';
import DisplayUser from './user/DisplayUser';
import headersData from './HeaderData';
import { color } from '@mui/system';

const getDrawerChoices = () => {
    return headersData.map(({ label, href }) => {
        return (
            <NavLink className="ripple nav-link" underline="none"
                {...{
                    to: href,
                    key: label,
                }}
            >
                <MenuItem>{label}</MenuItem>
            </NavLink>
        );
    });
};

const displayDesktop = () => {
    return (
        <div className=''>
            <Toolbar className='toolbar'>
                {smartAfyaLogo}
                <div className="menu-btn">{getMenuButtons()}</div>
                <DisplayUser />
            </Toolbar>
        </div>
    );
};

const DisplayMobile = () => {
    const [state, setState] = useState({
        mobileView: false,
        drawerOpen: false
    });
    const { mobileView, drawerOpen } = state;

    const handleDrawerOpen = () =>
        setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
        setState((prevState) => ({ ...prevState, drawerOpen: false }));
    return (
        <Toolbar>
            <IconButton
                {...{
                    edge: "start",
                    "aria-label": "menu",
                    "aria-haspopup": "true",
                    onClick: handleDrawerOpen,
                }}
            >
                <MenuIcon />
            </IconButton>
            <Drawer
                {...{
                    anchor: "left",
                    open: drawerOpen,
                    onClose: handleDrawerClose,
                }}
            >
                <div className="drawerContainer">{getDrawerChoices()}</div>
                <Box mt={4}>
                    <DisplayUser />
                </Box>
            </Drawer>
            <div>{smartAfyaLogo}</div>
        </Toolbar>
    );
}


export {
    displayDesktop,
    DisplayMobile
}