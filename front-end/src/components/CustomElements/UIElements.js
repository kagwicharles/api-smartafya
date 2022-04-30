import React, { useState } from "react";
import {
    InputAdornment, IconButton,
    Input, FormControl,
    InputLabel
} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const PassWordField = (props) => {
    const [password, setPassword] = useState('')
    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
    });

    const handleChange = (password) => {
        setPassword(password);
        if (props.updatePassword)
            props.updatePassword(password);
        if (props.updateConfirmPassword)
            props.updateConfirmPassword(password);
    }

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <FormControl variant="standard">
            <InputLabel htmlFor="standard-adornment-password">{props.label}</InputLabel>
            <Input
                variant="standard"
                id="password"
                required
                type={values.showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => handleChange(e.target.value)}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>
    )
}

export { PassWordField }