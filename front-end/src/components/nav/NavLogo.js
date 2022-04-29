import { Typography } from '@mui/material';
import { NavLink } from 'react-router-dom'

const smartAfyaLogo = (
    <NavLink to="/"
        className="nav-logo"
        underline="none">
        <Typography
            variant="h4"
            style={{ fontWeight: "bold", color: "#041920" }}>
            Afya API.
        </Typography>
    </NavLink>
);

export default smartAfyaLogo
