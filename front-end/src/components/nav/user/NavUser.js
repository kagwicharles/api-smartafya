import { Box, Button } from "@mui/material"
import AccountPopover from "../../auth/AccountPopover"

const LoggedOut = () => {
    return (
        <Box>
            <Button
                variant='contained'
                href="/login"
                className='m-1'
                sx={{
                    backgroundColor: "#1976D2",
                    ':hover': {
                        backgroundColor: "#1976D2",
                        color: '#fff',
                    }
                }}
                disableElevation={true}
            >
                Login</Button>
            <Button
                variant='contained'
                className='m-1'
                href="/register"
                disableElevation={true}
                color="success"
                sx={{
                    ':hover': {
                        color: "white",
                    },
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
