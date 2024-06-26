import { Image } from '@mui/icons-material';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    Paper,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { usePutTradeCheck } from 'react-query/chat';

export default function ChatTitle(props) {
    const {
        thumbnail,
        name,
        price,
        roomId,
        bidderId,
        sellerId,
        bidderCheck,
        sellerCheck,
    } = props;

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const { mutate: tradeCheck } = usePutTradeCheck(roomId);

    return (
        <>
            <Card sx={{ display: 'flex', m: 1, minHeight: 100 }}>
                <CardMedia
                    component="img"
                    sx={{ width: 100, height: 100, objectFit: 'cover' }}
                    image={thumbnail}
                />
                <Box
                    sx={{
                        flex: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        p: 1,
                        minWidth: 0,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            minWidth: 0,
                        }}
                    >
                        <Box sx={{ flex: 2, minWidth: 0 }}>
                            <Typography
                                variant="body1"
                                fontWeight={'bold'}
                                sx={{
                                    textOverflow: 'ellipsis',

                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                }}
                            >
                                {name}
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        fullWidth
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-start ',
                            alignItems: 'center',
                        }}
                    >
                        <Typography
                            variant="caption"
                            sx={{
                                textOverflow: 'ellipsis',
                                width: '80%',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                color: 'gray',
                            }}
                        >
                            최종거래가 : {price?.toLocaleString()}원
                        </Typography>
                    </Box>
                    <Box
                        fullWidth
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                        }}
                    >
                        {(sellerId == localStorage.getItem('memberId') &&
                            (sellerCheck == 0 || sellerCheck == null)) ||
                        (bidderId == localStorage.getItem('memberId') &&
                            (bidderCheck == 0 || bidderCheck == null)) ? (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleClickOpen}
                            >
                                거래 확정
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                disabled
                            >
                                거래 확정
                            </Button>
                        )}
                    </Box>
                </Box>
            </Card>

            {/* <Card sx={{ display: 'flex', m: 1 }}>
                <CardMedia
                    component="img"
                    sx={{
                        width: '10rem',
                        height: '10rem',
                        // width: 100,
                        // height: 100,
                        objectFit: 'cover',
                        // flex: 1,
                    }}
                    image={thumbnail}
                />

                <Box
                    sx={{
                        flex: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        p: 1,
                        // boxSizing: 'border-box',
                        minWidth: 0,
                    }}
                >
                    <Typography
                        variant="h6"
                        fontWeight={'bold'}
                        sx={{
                            textOverflow: 'ellipsis',
                            // width: '85vw',

                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                        }}
                    >
                        {name}
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={
                            {
                                // textOverflow: 'ellipsis',
                                // // width: '85vw',
                                // whiteSpace: 'nowrap',
                                // overflow: 'hidden',
                            }
                        }
                    >
                        최종거래가 : {price?.toLocaleString()}원
                    </Typography>

                    {(sellerId == localStorage.getItem('memberId') &&
                        sellerCheck == 0) ||
                    (bidderId == localStorage.getItem('memberId') &&
                        bidderCheck == 0) ? (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleClickOpen}
                        >
                            거래 확정
                        </Button>
                    ) : (
                        <Button variant="contained" color="primary" disabled>
                            거래 확정
                        </Button>
                    )}
                </Box>
            </Card> */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
            >
                {/* <DialogTitle id="alert-dialog-title">거래 확정</DialogTitle> */}
                <DialogContent>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 1, mb: 1 }}
                        onClick={() => {
                            tradeCheck(2);
                            handleClose();
                        }}
                    >
                        거래 완료
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        fullWidth
                        sx={{ mt: 1, mb: 1 }}
                        onClick={() => {
                            tradeCheck(1);
                            handleClose();
                        }}
                    >
                        거래 실패
                    </Button>
                </DialogContent>
            </Dialog>
        </>
    );
}
