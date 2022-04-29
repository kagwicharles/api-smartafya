import { Box, Button, Grow, Slide } from "@mui/material"
import AccountPopover from "../../auth/AccountPopover"

const LoggedOut = () => {
    return (
        <Box>
            <Button
                variant='contained'
                color='success'
                href="/login"
                className='m-1'
                sx={{
                    textTransform: "none",
                    ':hover': {
                        color: '#fff',
                    },
                    textTransform: "none",
                    fontSize: 16
                }}
                disableElevation={true}
            >
                Login</Button>
            <Button
                variant='contained'
                className='m-1'
                href="/register"
                disableElevation={true}
                sx={{
                    backgroundColor: "#041920",
                    textTransform: "none",
                    ':hover': {
                        color: "white",
                        backgroundColor: "#041920",
                    },
                    textTransform: "none",
                    fontSize: 16
                }}>
                Sign Up</Button>
        </Box>
    )
}

const LoggedIn = (props) => {
    return (
        <AccountPopover />
    )
}

export {
    LoggedOut, LoggedIn
}
