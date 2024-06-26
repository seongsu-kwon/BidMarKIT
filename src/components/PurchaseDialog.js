import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { usePurchaseProduct } from 'react-query/product';
import { useNavigate } from 'react-router-dom';

export default function PurchaseDialog(props) {
    const navigate = useNavigate();

    const { product, productId, remain } = props;
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const { mutate: purchaseMutate } = usePurchaseProduct(productId);
    const onClickPurchase = () => {
        purchaseMutate();
        setOpen(false);
    };
    return (
        <>
            {product?.state == 0 && (
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={
                        localStorage.getItem('accessToken')
                            ? handleClickOpen
                            : () => navigate('/login')
                    }
                    size="large"
                    disabled={product?.state !== 0}
                >
                    구매하기
                </Button>
            )}

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
            >
                <DialogTitle id="alert-dialog-title">구매 하기</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                        <Grid item md={4} xs={4}>
                            <Typography variant="body1" fontWeight={'bold'}>
                                즉구가
                            </Typography>
                        </Grid>
                        <Grid item md={8} xs={8}>
                            <Typography variant="h5" fontWeight={'bold'}>
                                {product?.price.toLocaleString()}원
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                        <Grid item md={4} xs={4}>
                            <Typography variant="body1" fontWeight={'bold'}>
                                남은 시간
                            </Typography>
                        </Grid>
                        <Grid item md={8} xs={8}>
                            <Typography variant="body1" fontWeight={'bold'}>
                                {remain}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            mt: 2,
                        }}
                    >
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={onClickPurchase}
                            size="large"
                        >
                            즉시 구매
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
}
