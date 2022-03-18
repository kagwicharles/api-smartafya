import { Grid, Typography, Button, Fade } from "@mui/material"
import React, { useEffect, useState } from "react";
import { Icon } from '@iconify/react'
import { ToastContainer, Slide, toast } from 'react-toastify';
import { notify } from "../../src/utils/util";
import 'react-toastify/dist/ReactToastify.css';

import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from '../authentication/firebase'
import { getFirestore, getDocs, collection } from "firebase/firestore"
import { deleteApp } from "../db/firebaseDb";
import { LOW_LEVEL_DOC, TOP_LEVEL_DOC } from "../../src/utils/util";

import '../static/css/applications.css'

export default function Apis() {

    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const [apps, setApps] = useState([])
    const [highlightedText, setHighlightedText] = useState("")
    const db = getFirestore();

    const handleCopyClip = (e) => {
        e.preventDefault()
        const row = e.target.parentNode.parentNode
        const cell = row.cells[2]
        const apiKey = cell.textContent
        setHighlightedText(apiKey)
        navigator.clipboard.writeText(highlightedText);
        notify("Key copied!", toast.TYPE.SUCCESS)
    }
    const handleDeleteApp = (e) => {
        e.preventDefault()
        const row = e.target.parentNode.parentNode
        const apiKey = row.cells[2].textContent
        const appName = row.cells[1].textContent
        deleteApp(TOP_LEVEL_DOC, "kagwitheuri@gmail.com", LOW_LEVEL_DOC, apiKey)
        row.remove()
        notify(appName + " deleted successfully")
    }

    useEffect(() => {
        var jsonData = []
        async function fetchMyApps() {
            const userEmail = user.email
            const querySnap = await getDocs(collection(db,
                TOP_LEVEL_DOC, userEmail, LOW_LEVEL_DOC))
            querySnap.forEach((doc) => {
                var app = doc.data()
                var authorized = ""
                if (app.authorized.toString() === "true") {
                    authorized = "Yes"
                } else {
                    authorized = "No"
                }
                var obj = {
                    'AppName': app.appName,
                    'ApiKey': app.apiKey,
                    'Authorized': authorized
                }
                jsonData.push(obj)
            })
            setApps(jsonData)
        }
        fetchMyApps()
    }, [user, loading])

    var column = null

    if (apps !== null || apps != 'undefined') {
        try {
            column = Object.keys(apps[0])
        } catch (err) {
        }
    }

    // get table row data
    const appData = () => {

        return apps.map((data, i) => {
            return (
                <tr>
                    <td>{i + 1}</td>
                    <td>{data.AppName}</td>
                    <td>{data.ApiKey}</td>
                    <td>{data.Authorized}</td>
                    <td style={{ marginLeft: 5 }}><Icon
                        onClick={handleCopyClip}
                        width='25'
                        height='25'
                        color="#353c47"
                        icon="ep:copy-document"></Icon>
                        <Button className="table-btn" sx={{ marginLeft: 1 }}
                            variant="text"
                            disableElevation={true}
                            onClick={(e) => { handleDeleteApp(e) }}
                            color="error">Delete</Button></td>
                </tr >
            )
        })
    }

    useEffect(() => {
        if (loading) return
        if (!user) return navigate("/login")
    }, [user, loading]);

    return (
        <Fade in={true} timeout={1000}>
            <div className="container fill-height apis-cont pt-2">
                < Grid container
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        alignContent: 'center'
                    }
                    }>
                    <Icon width='40' height='40' color="#353c47" icon="carbon:application" />
                    <Typography style={{
                        marginLeft: '10px',
                        marginRight: '10px'
                    }} variant='h5' >
                        My Applications
                    </Typography>
                    <Button
                        sx={{
                            ':hover': {
                                color: '#fff',
                            },
                        }}
                        variant='contained'
                        onClick={() => {
                            navigate("/applications/create")
                        }}
                        startIcon={<Icon icon="bi:plus-lg" />}
                        disableElevation={true}>
                        New Application</Button>
                </Grid >
                <p align="left" className="mt-2 mb-4">
                    An application will help you integrate to our API by generating an api key.</p>
                <Grid lg={9} sm={12} xs={12}
                    className="table-responsive">
                    <table style={{ overflowX: 'auto' }}
                        className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="#">#</th>
                                <th scope="col">Name</th>
                                <th scope="col" name="api_key">Api key</th>
                                <th scope="col">Authorized</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appData()}
                        </tbody>
                    </table>
                </Grid>
                <ToastContainer
                    transition={Slide}
                    toastStyle={{
                        backgroundColor: "#fafafa",
                    }} />
                <ToastContainer
                    transition={Slide}
                    toastStyle={{
                        backgroundColor: "#fafafa",
                    }} />
            </div >
        </Fade>
    )
}