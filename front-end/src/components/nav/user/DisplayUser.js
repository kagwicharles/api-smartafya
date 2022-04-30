import { Fade, Grid } from "@mui/material"
import { LoggedOut, LoggedIn } from "./NavUser"

import { useUserAuth } from "../../../authentication/AuthProvider";

const DisplayUser = () => {
    const { user } = useUserAuth();

    return (
        < Grid lg={2}
            sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "row"
            }
            }>
            {
                !user ?
                    <Fade in={true} timeout={10}>
                        <div>
                            <LoggedOut />
                        </div>
                    </Fade>
                    :
                    <Fade in={true} timeout={3000}>
                        <div>
                            <LoggedIn />
                        </div>
                    </Fade>
            }
        </Grid >
    )
}

export default DisplayUser