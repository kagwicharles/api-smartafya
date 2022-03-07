import { useState } from 'react';
import {
    Button, Dialog,
    DialogActions, DialogContent, DialogContentText,
    DialogTitle, Stack
} from '@mui/material';

import { performDiagnosis } from '../services/DiagnosisService'

import '../static/css/demo_dialog.css'
import $ from 'jquery'

export default function DemoDialog(props) {

    const [file, setFile] = useState('')
    const [disease, setDisease] = useState('select')

    const dropdownItems = [
        'Malaria',
        'Pneumonia',
        'Covid19'
    ]

    const handleDropDownSelect = () => {

    }

    const closeDialog = () => {
        props.onClose()
    }

    const inputValidation = () => {
        if (file === null || disease === 'select') {
            $('#validateText').fadeIn(600)
            return false
        }
        $('#validateText').hide()
    }

    const handleDiseaseSelection = (e) => {
        setDisease(e.target.value)
    }

    const handleImageUpload = (e) => {
        $('.image-section').show();
        $(".loader").hide()
        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();
            const fileUpload = e.target.files[0];
            reader.onloadend = () => {
                setFile(fileUpload)
                $('#imgPreview').css('background-image', 'url(' + reader.result + ')');
                $('#imgPreview').fadeIn(650);
                $("#diagnosisResults").hide()
            };
            reader.readAsDataURL(fileUpload);
        }
    }

    const handleDiagnosis = () => {
        const isInputCorrect = inputValidation()
        console.log("Input*** ", isInputCorrect)
        if (isInputCorrect === false || disease === 'select') {
            return
        }
        $("#diagnosisResults").hide()
        $(".loader").show()
        performDiagnosis(file, disease)
    }

    return (
        <div>
            <Dialog open={props.open} onClose={props.onClose}>
                <DialogTitle variant="h5">
                    Perform diagnosis &nbsp;
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To perform a diagnosis on a medical image, select a disease type
                        from the dropdown below and upload an appropriate image either
                        microscopic cell(Malaria dignosis) or
                        chest x-ray(Pneumonia or Covid19)
                    </DialogContentText>
                    <Stack spacing={1} className="pt-2">
                        <p id="validateText" style={{ color: 'red', display: "none" }}
                        >Ensure all fields are correct!</p>
                        <div className='dropdown'>
                            <select id='diseaseDropdown'
                                onChange={handleDiseaseSelection} value={disease}>
                                <option className='dropdown-option' value="select">Select disease</option>
                                <option className='dropdown-option' value="1">Malaria</option>
                                <option className='dropdown-option' value="2">Pneumonia</option>
                                <option className='dropdown-option' value="3">Covid19</option>
                            </select>
                        </div>
                        <form id="upload-file" method="post"
                            encType="multipart/form-data">
                            <label htmlFor="imageUpload" className="upload-label">
                                Select Image
                            </label>&nbsp;
                            <input type="file" name="file"
                                id="imageUpload"
                                onChange={handleImageUpload}
                                accept=".png, .jpg, .jpeg" />
                        </form>

                        <div className="image-section" style={{ display: "none" }}>
                            <div className="img-preview">
                                <div id="imgPreview" />
                            </div>
                            <h4 id="diagnosisResults"
                                style={{ display: "none" }}
                                className='mt-4 font-face-robotoB'><span></span></h4>
                            <div className="loader" style={{ display: "none" }}></div>
                        </div>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog}>Cancel</Button>
                    <Button onClick={handleDiagnosis}>Diagnose</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
