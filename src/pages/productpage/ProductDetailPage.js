import React, { useState, useEffect, useRef } from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Avatar,
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Modal,
    TextField,
    Typography,
} from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StarIcon from '@mui/icons-material/Star';
// import Button from 'components/Button';
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetBids, useGetProduct } from 'react-query/product';
import BidDialog from 'components/BidDialog';
import PurchaseDialog from 'components/PurchaseDialog';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import QnaAccordion from 'components/QnaAccordion';
import { usePostQuestion } from 'react-query/qna';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80vw',
    height: '40vh',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
};

export default function ProductDetailPage() {
    const navigate = useNavigate('/login');
    const { id } = useParams();

    const [remain, setRemain] = useState();

    const [like, setLike] = useState(false);

    const { product } = useGetProduct(id);

    const { bids } = useGetBids(id);

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [isSeller, setIsSeller] = useState(false);

    const { mutate: postQuestion } = usePostQuestion();

    const [expanded, setExpanded] = useState('');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const [qOpen, setQOpen] = useState(false);

    const [question, setQuestion] = useState('');

    const handleQOpen = () => setQOpen(true);
    const handleQClose = () => setQOpen(false);

    useEffect(() => {
        console.log(product?.questions);

        if (!localStorage.getItem('memberId')) {
            setIsSeller(false);
        } else if (localStorage?.getItem('memberId') == product?.sellerName) {
            setIsSeller(true);
        }

        const startDate = new Date();
        const endDate = new Date(product?.deadline);
        const day = startDate.getTime() - endDate.getTime();
        const dDay = Math.floor(Math.abs(day / (1000 * 3600 * 24)));
        const dHour = Math.floor(Math.abs((day / (1000 * 3600)) % 24));
        const dMin = Math.floor(Math.abs((day / (1000 * 60)) % 60));
        const dSec = Math.floor(Math.abs((day / 1000) % 60));

        setRemain(`${dDay}일 ${dHour}시간 ${dMin}분 ${dSec}초`);
        if (dDay === 0) {
            setRemain(`${dHour}시간 ${dMin}분 ${dSec}초`);
            if (dHour === 0) {
                setRemain(`${dMin}분 ${dSec}초`);
                if (dMin === 0) {
                    setRemain(`${dSec}초`);
                    if (dSec === 0) {
                        setRemain('마감');
                    }
                }
            }
        }
        const interval = setInterval(() => {
            const startDate = new Date();
            const endDate = new Date(product?.deadline);
            const day = startDate.getTime() - endDate.getTime();
            const dDay = Math.floor(Math.abs(day / (1000 * 3600 * 24)));
            const dHour = Math.floor(Math.abs((day / (1000 * 3600)) % 24));
            const dMin = Math.floor(Math.abs((day / (1000 * 60)) % 60));
            const dSec = Math.floor(Math.abs((day / 1000) % 60));

            setRemain(`${dDay}일 ${dHour}시간 ${dMin}분 ${dSec}초`);
            if (dDay === 0) {
                setRemain(`${dHour}시간 ${dMin}분 ${dSec}초`);
                if (dHour === 0) {
                    setRemain(`${dMin}분 ${dSec}초`);
                    if (dMin === 0) {
                        setRemain(`${dSec}초`);
                        if (dSec === 0) {
                            setRemain('마감');
                            clearInterval(interval);
                        }
                    }
                }
            }
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [product, qOpen, expanded]);

    const handleQuestion = async (e) => {
        // postQuestion({ productId: Number(id), content: question });

        try {
            await Promise.all([
                postQuestion({ productId: Number(id), content: question }),
            ]);
        } catch (e) {
            console.log(e);
        }
        handleQClose();
    };

    return (
        <div
            style={{
                '& .MuiBox-root ..slide': {
                    border: '4px solid red',
                },
            }}
        >
            <Carousel
                // slidable={true}
                // emulateTouch={true}
                showStatus={false}
                // showArrows={count === 4 ? true : false}
                showArrows={false}
                showThumbs={false}
                preventMovementUntilSwipeScrollTolerance={true}
                swipeScrollTolerance={50}
                infiniteLoop={true}
                autoPlay={true}
                interval={3000}
            >
                {!product ? (
                    <Box
                        sx={{
                            width: '100%',
                            maxHeight: '40vh',
                            position: 'relative',
                            objectFit: 'contain',
                            overflow: 'auto',
                            alignSelf: 'center',
                        }}
                    >
                        <img
                            src="https://via.placeholder.com/150"
                            alt="상품 이미지"
                            // style={{ width: '400px', height: '300px' }}
                            style={{
                                width: '100%',
                                height: '40vh',
                                verticalAlign: 'middle',
                                opacity: product?.state === 0 ? 1 : 0.5,
                                objectFit: 'contain',
                            }}
                        />
                        <Box
                            sx={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                top: 0,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            {product?.state === 1 ? (
                                <Typography
                                    variant="h6"
                                    color="text.secondary"
                                    fontWeight={'bold'}
                                >
                                    거래 중
                                </Typography>
                            ) : product?.state === 2 ? (
                                <Typography
                                    variant="h6"
                                    color="text.secondary"
                                    fontWeight={'bold'}
                                >
                                    유찰
                                </Typography>
                            ) : product?.state === 3 ? (
                                <Typography
                                    variant="h6"
                                    color="text.secondary"
                                    fontWeight={'bold'}
                                >
                                    판매 완료
                                </Typography>
                            ) : null}
                        </Box>
                    </Box>
                ) : (
                    product?.images?.map((image, index) => (
                        <Box
                            key={index}
                            sx={{
                                width: '100%',
                                maxHeight: '40vh',
                                position: 'relative',
                                objectFit: 'contain',
                                overflow: 'auto',
                                alignSelf: 'center',
                            }}
                        >
                            <img
                                src={image}
                                alt="상품 이미지"
                                // style={{ width: '400px', height: '300px' }}
                                style={{
                                    width: '100%',
                                    height: '40vh',
                                    verticalAlign: 'middle',
                                    opacity: product?.state === 0 ? 1 : 0.5,
                                    objectFit: 'contain',
                                }}
                            />
                            <Box
                                sx={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    top: 0,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                {product?.state === 1 ? (
                                    <Typography
                                        variant="h6"
                                        color="text.secondary"
                                        fontWeight={'bold'}
                                    >
                                        거래 중
                                    </Typography>
                                ) : product?.state === 2 ? (
                                    <Typography
                                        variant="h6"
                                        color="text.secondary"
                                        fontWeight={'bold'}
                                    >
                                        유찰
                                    </Typography>
                                ) : product?.state === 3 ? (
                                    <Typography
                                        variant="h6"
                                        color="text.secondary"
                                        fontWeight={'bold'}
                                    >
                                        판매 완료
                                    </Typography>
                                ) : null}
                            </Box>
                        </Box>
                    ))
                )}
            </Carousel>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3>{product?.productName}</h3>
            </Box>

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
            <Typography variant="body2">
                시작가 : {product?.initPrice.toLocaleString()}원
            </Typography>
            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                <Grid item md={4} xs={4}>
                    <Typography variant="body1" fontWeight={'bold'}>
                        즉시구매가
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
                    <Typography variant="h6" fontWeight={'bold'}>
                        {remain}
                    </Typography>
                </Grid>
            </Grid>

            <Typography variant="body2">
                마감 기한 : ~{' '}
                {dayjs(product?.deadline).format('YYYY.MM.DD HH:mm')}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="outlined" onClick={handleOpen}>
                    입찰 기록
                </Button>
            </Box>

            <hr />
            <Typography variant="h5" fontWeight={'bold'}>
                판매자 정보
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ width: 50, height: 50 }}>
                        <AccountCircleIcon sx={{ width: 50, height: 50 }} />
                    </Avatar>
                    <Typography variant="h6">{product?.sellerName}</Typography>
                </Box>
                <Box>
                    <Typography variant="body2">
                        구매파기횟수 : {product?.cancelPurchase || 0}
                    </Typography>
                    <Typography variant="body2">
                        판매파기횟수 : {product?.cancelSale || 0}
                    </Typography>
                </Box>
                {/* <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                    }}
                >
                    <StarIcon fontSize="large" />
                    <Typography variant="h6">4.5</Typography>
                </Box> */}
            </Box>
            <hr />
            <Typography variant="h5" fontWeight={'bold'}>
                상품 설명
            </Typography>
            <Typography
                variant="body2"
                sx={{
                    textAlign: 'left',
                    overflow: 'auto',
                    wordBreak: 'keep-all',
                    width: '100%',
                    whiteSpace: 'pre-wrap',
                }}
            >
                {product?.content}
            </Typography>

            <Offset />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    position: 'sticky',
                    bottom: '70px',
                }}
            >
                <BidDialog product={product} productId={id} remain={remain} />
                <PurchaseDialog
                    product={product}
                    productId={id}
                    remain={remain}
                />
            </Box>

            {/* qna 컴포넌트 */}

            <>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: 2,
                        mb: 2,
                    }}
                >
                    <Typography variant="h5" fontWeight={'bold'}>
                        QnA
                    </Typography>
                    {!isSeller && (
                        <Button
                            variant="outlined"
                            onClick={
                                localStorage.getItem('accessToken')
                                    ? handleQOpen
                                    : () => navigate('/login')
                            }
                        >
                            문의하기
                        </Button>
                    )}
                </Box>

                <Dialog
                    open={qOpen}
                    onClose={handleQClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth
                >
                    <DialogTitle>문의하기</DialogTitle>
                    <DialogContent>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            value={question}
                            onChange={(e) => {
                                setQuestion(e.target.value);
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleQClose}>취소</Button>
                        <Button onClick={handleQuestion}>확인</Button>
                    </DialogActions>
                </Dialog>
            </>

            {product?.questions?.map((question, index) => (
                <QnaAccordion
                    key={index}
                    question={question}
                    expanded={expanded}
                    handleChange={handleChange}
                    isSeller={isSeller}
                />
            ))}

            <Offset />

            {/* <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Chip label="질문" color="primary" />
              <Typography variant="h6" sx={{ m: 1 }}>
                작성자
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ p: 1 }}>
              ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus
              feugiat, molestie ipsum et, consequat nunc. Nulla facilisi
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextField label="답변" fullWidth multiline rows={4} />
            <Button variant="outlined" sx={{ flex: 1 }}>
              등록
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Chip label="질문" color="primary" />
              <Typography variant="h6" sx={{ m: 1 }}>
                작성자
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ p: 1 }}>
              ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus
              feugiat, molestie ipsum et, consequat nunc. Nulla facilisi
            </Typography>
          </Box>
        </AccordionSummary>

        <AccordionDetails>
          <Chip label="답변" color="secondary" />
          <Typography variant="body2" sx={{ p: 1 }}>
            ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus
            feugiat, molestie ipsum et, consequat nunc. Nulla facilisi
          </Typography>
        </AccordionDetails>
      </Accordion> */}

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
            >
                <DialogTitle>입찰 기록</DialogTitle>
                <DialogContent>
                    <Box sx={{ overflow: 'auto', height: '40vh' }}>
                        {bids?.map((bid, index) => (
                            <Box key={index}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Typography variant="h6">
                                        {bid?.memberId}
                                    </Typography>
                                    <Typography variant="body1">
                                        {bid?.price.toLocaleString()}원
                                    </Typography>
                                </Box>

                                <Typography variant="body2" align="right">
                                    {dayjs(bid?.createdAt).format(
                                        'YYYY.MM.DD HH:mm:ss'
                                    )}
                                </Typography>
                                <hr />
                            </Box>
                        ))}
                    </Box>
                </DialogContent>
            </Dialog>
        </div>
    );
}
