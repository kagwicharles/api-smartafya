import { Box } from '@mui/material'
import { NavLink } from 'react-router-dom'

import headersData from './HeaderData';

const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
        return (
            <Box id="btnContainer">
                <NavLink className="nav-link ripple text-light px-1"
                    {...{
                        key: label,
                        to: href,
                    }}
                >
                    {label}
                </NavLink>
            </Box>
        );
    });
};

export default getMenuButtons