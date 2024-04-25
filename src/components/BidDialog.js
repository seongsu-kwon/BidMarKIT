import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    TextField,
    Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useBidProduct, useAutoBidProduct } from 'react-query/product';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

export default function BidDialog(props) {
    const { product, remain } = props;

    //입찰단위가 계산
    const [bidUnit, setBidUnit] = useState(0);
    useEffect(() => {
        let price = product?.bidPrice;
        let unit = 0;
        if (price < 10000) {
            unit = 100;
        } else if (price < 50000) {
            unit = 1000;
        } else if (price < 100000) {
            unit = 2500;
        } else if (price < 500000) {
            unit = 5000;
        } else {
            unit = 10000;
        }
        setBidUnit(unit);
    }, [product?.bidPrice]);

    const [bidAmount, setBidAmount] = useState('0');
    const handleBidAmount = (e) => {
        let price = e.target.value;
        price = Number(price.replaceAll(/[^0-9]/g, ''));
        if (isNaN(price)) {
            setBidAmount(0);
        } else {
            setBidAmount(price.toLocaleString());
        }
    };

    const handleBidAmountUp = () => {
        let price = Number(bidAmount.replaceAll(/[^0-9]/g, ''));
        price += bidUnit;
        setBidAmount(price.toLocaleString());
    };

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
        setBidAmount((product?.bidPrice + bidUnit).toLocaleString());
    };
    const handleClose = () => {
        setOpen(false);
    };

    const { mutate: bidMutate } = useBidProduct(product?.id);

    const { mutate: autoBidMutate } = useAutoBidProduct(product?.id);

    const onClickBid = () => {
        bidMutate({
            memberId: localStorage.getItem('id') || '123',
            productId: Number(product?.id),
            price: Number(bidAmount.replaceAll(/[^0-9]/g, '')),
            createdAt: dayjs().format('YYYY-MM-DDTHH:mm:ss'),
        });
        setOpen(false);
    };

    const onClickAutoBid = () => {
        autoBidMutate({
            memberId: localStorage.getItem('id') || '123',
            productId: Number(product?.id),
            ceilingPrice: Number(bidAmount.replaceAll(/[^0-9]/g, '')),
        });

        setOpen(false);
    };

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                onClick={() => handleClickOpen()}
                size="large"
            >
                입찰하기
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
            >
                <DialogTitle id="alert-dialog-title">입찰 하기</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                        <Grid item md={4} xs={4}>
                            <Typography variant="body1" fontWeight={'bold'}>
                                현재가
                            </Typography>
                        </Grid>
                        <Grid item md={8} xs={8}>
                            <Typography variant="h5" fontWeight={'bold'}>
                                {product?.bidPrice.toLocaleString()}원
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
                    <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                        <Grid item md={4} xs={4}>
                            <Typography variant="body1" fontWeight={'bold'}>
                                입찰단위
                            </Typography>
                        </Grid>
                        <Grid item md={8} xs={8}>
                            <Typography variant="body1" fontWeight={'bold'}>
                                {bidUnit.toLocaleString()}원
                            </Typography>
                        </Grid>
                    </Grid>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mt: 2,
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <TextField
                                variant="outlined"
                                fontWeight={'bold'}
                                value={bidAmount}
                                onChange={handleBidAmount}
                                inputProps={{
                                    style: { textAlign: 'right' },
                                }}
                                inputMode="numeric"
                            />
                            <Typography variant="h6" fontWeight={'bold'}>
                                원
                            </Typography>
                        </Box>
                        <Button
                            variant="outlined"
                            startIcon={<ArrowCircleUpIcon />}
                            onClick={handleBidAmountUp}
                            sx={{ m: 1 }}
                        >
                            {bidUnit.toLocaleString()}
                        </Button>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            mt: 2,
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={onClickBid}
                            size="large"
                            disabled={
                                Number(bidAmount.replaceAll(/[^0-9]/g, '')) <
                                product?.bidPrice + bidUnit
                            }
                        >
                            직접 입찰
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={onClickAutoBid}
                            size="large"
                            disabled={
                                Number(bidAmount.replaceAll(/[^0-9]/g, '')) <
                                product?.bidPrice + bidUnit
                            }
                        >
                            자동 입찰
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
}
