import { Typography } from '@mui/material';
import { NavLink } from 'react-router-dom'

const smartAfyaLogo = (
    <NavLink to="/"
        className="nav-logo"
        underline="none">
        <Typography
            variant="h4"
            style={{ 
                fontFamily: "Roboto",
                fontWeight: "bold",
             color: "#fafafa" }}>
            Smart afya
        </Typography>
    </NavLink>
);

export default smartAfyaLogo
