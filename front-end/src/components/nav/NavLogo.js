import { Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'

const smartAfyaLogo = (
    <NavLink to="/"
        className="nav-logo text-white"
        underline="none">
        <Typography
            sx={{ fontWeight: "bold" }}
            variant="h4">
            Smart Afya
        </Typography>
    </NavLink>
);

export default smartAfyaLogo
