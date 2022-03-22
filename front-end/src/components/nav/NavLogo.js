import { Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'

const smartAfyaLogo = (
    <NavLink to="/"
        className="nav-logo text-white"
        underline="none">
        <Typography
            sx={{ fontWeight: "bold" }}
            className="font-face-roboto-black"
            variant="h5" component="h1">
            Smart Afya
        </Typography>
    </NavLink>
);

export default smartAfyaLogo
