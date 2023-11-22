    import React, { useState } from 'react';
    import { useForm, Controller } from 'react-hook-form';
    import { TextField, Button, Container, Typography, Box, Paper } from '@mui/material';
    import { toast, ToastContainer } from 'react-toastify';
    import 'react-toastify/dist/ReactToastify.css';
    import { ErrorMessage } from '@hookform/error-message';
    import {useCreditCard} from '../../Hooks/useCreditCard'
    import { useNavigate } from 'react-router-dom';

    const CardDetails = () => {
    const [formData, setFormData] = useState({
        cardNumber: '',
        cardHolderName: '',
        expiryDate: '',
        cvv: '',
    });
    const [formErrors, setFormErrors] = useState({});
    const { control, handleSubmit } = useForm();
    const { addCard } = useCreditCard();
    const user = JSON.parse(window.localStorage.getItem('user'))
    const navigate = useNavigate()

    const onSubmit = async () => {
        const id = user.user._id
        console.log(id);
        console.log(user.user._id,formData.cardNumber,formData.cardHolderName,formData.expiryDate,formData.cvv);
        await addCard(user.user._id,formData.cardNumber,formData.cardHolderName,formData.expiryDate,formData.cvv)
    
        if (formData.cardNumber === '1234') {
        setFormErrors({ cardNumber: 'Invalid card number' });
        toast.error('Invalid card number');
        } else {
        // Successful submission logic
        toast.success('Form submitted successfully!');
        navigate("/groups")
        
        }
    };

    const handleInputChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
        setFormErrors({ ...formErrors, [name]: '' });
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper>

        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderRadius: '10px',
                padding: '20px',
            }}
            >
            <Typography component="h1" variant="h5" sx={{ color: '#2196F3' }}>
            Credit Card Info
            </Typography>
            <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
            >
            <Controller
                name="cardNumber"
                control={control}
                defaultValue=""
                rules={{
                    required: 'Card number is required',
                    pattern: {
                        value: /^[0-9]{16}$/,
                        message: 'Invalid card number',
                    },
                }}
                render={({ field }) => (
                    <TextField
                    {...field}
                    margin="normal"
                    required
                    fullWidth
                    id="cardNumber"
                    label="Card Number"
                    autoComplete="cardNumber"
                    autoFocus
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                    sx={{ backgroundColor: 'white', borderRadius: '5px' }}
                    />
                    )}
                    />
            <ErrorMessage
                errors={formErrors}
                name="cardNumber"
                render={({ message }) => <p>{message}</p>}
                />

            <Controller
                name="cardHolderName"
                control={control}
                defaultValue=""
                rules={{ required: 'Cardholder name is required' }}
                render={({ field }) => (
                    <TextField
                    {...field}
                    margin="normal"
                    required
                    fullWidth
                    id="cardHolderName"
                    label="Cardholder Name"
                    autoComplete="cardHolderName"
                    value={formData.cardHolderName}
                    onChange={(e) => handleInputChange('cardHolderName', e.target.value)}
                    sx={{ backgroundColor: 'white', borderRadius: '5px' }}
                    />
                    )}
                    />
            <ErrorMessage
                errors={formErrors}
                name="cardHolderName"
                render={({ message }) => <p>{message}</p>}
                />

            <Controller
                name="expiryDate"
                control={control}
                defaultValue=""
                rules={{
                    required: 'Expiry date is required',
                    pattern: {
                        value: /^\d{4}-(0[1-9]|1[0-2])$/,
                        message: 'Invalid expiry date (YYYY-MM)',
                    },
                }}
                render={({ field }) => (
                    <TextField
                    {...field}
                    margin="normal"
                    required
                    fullWidth
                    id="expiryDate"
                    label="Expiry Date (YYYY/MM)"
                    autoComplete="expiryDate"
                    value={formData.expiryDate}
                    onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                    sx={{ backgroundColor: 'white', borderRadius: '5px' }}
                    />
                    )}
                    />
            <ErrorMessage
                errors={formErrors}
                name="expiryDate"
                render={({ message }) => <p>{message}</p>}
                />

            <Controller
                name="cvv"
                control={control}
                defaultValue=""
                rules={{
                    required: 'CVV is required',
                    pattern: {
                        value: /^[0-9]{3}$/,
                        message: 'Invalid CVV (3 digits)',
                    },
                }}
                render={({ field }) => (
                    <TextField
                    {...field}
                    margin="normal"
                    required
                    fullWidth
                    id="cvv"
                    label="CVV"
                    autoComplete="cvv"
                    value={formData.cvv}
                    onChange={(e) => handleInputChange('cvv', e.target.value)}
                    sx={{ backgroundColor: 'white', borderRadius: '5px' }}
                    />
                    )}
                    />
            <ErrorMessage
                errors={formErrors}
                name="cvv"
                render={({ message }) => <p>{message}</p>}
                />

            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: '#2196F3', color: 'white' }}
                onClick={onSubmit}
                >
                Submit
            </Button>
            </Box>
        </Box>
        {/* Toast container for displaying error messages */}
        <ToastContainer />
                </Paper>
        </Container>
    );
    };

    export default CardDetails;
