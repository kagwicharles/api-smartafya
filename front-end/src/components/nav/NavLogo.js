import { Typography } from '@mui/material';
import { NavLink } from 'react-router-dom'

const smartAfyaLogo = (
    <NavLink to="/"
        className="nav-logo"
        underline="none">
        <Typography
            variant="h4"
            style={{
                fontWeight: "bold",
                fontFamily: "NotoSansBold",
                color: "#fff"
            }}>
            Smart Afya
        </Typography>
    </NavLink>
);

export default smartAfyaLogo
