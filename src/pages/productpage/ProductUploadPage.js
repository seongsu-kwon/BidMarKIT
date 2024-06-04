import React, { useState, useEffect } from 'react';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardMedia,
    FormControl,
    Grid,
    IconButton,
    NativeSelect,
    TextField,
    Typography,
} from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StarIcon from '@mui/icons-material/Star';
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DatePicker } from '@mui/x-date-pickers';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import instance from 'api/instance';
import { useNavigate } from 'react-router-dom';
import CategoryList from 'constants/Category';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

export default function ProductUploadPage() {
    const navigate = useNavigate();

    const [productName, setProductName] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState(0);
    const [initPrice, setInitPrice] = useState('0');
    const [price, setPrice] = useState('0');
    const [deadline, setDeadline] = useState();
    const [endDate, setEndDate] = useState(dayjs(new Date()));

    const formData = new FormData();

    const handleInitPrice = (e) => {
        let price = e.target.value;
        price = Number(price.replaceAll(/[^0-9]/g, ''));
        if (isNaN(price)) {
            setInitPrice(0);
        } else {
            setInitPrice(price.toLocaleString());
        }
    };

    const handlePrice = (e) => {
        let price = e.target.value;
        price = Number(price.replaceAll(/[^0-9]/g, ''));
        if (isNaN(price)) {
            setPrice(0);
        } else {
            setPrice(price.toLocaleString());
        }
    };

    const handleDeadline = (e) => {
        setEndDate(e);
        const start = dayjs(new Date());
        const end = dayjs(e);
        const diff = end.diff(start, 'day') + 1;
        setDeadline(diff);
    };

    const [imgList, setImgList] = useState([]);
    const [previews, setPreviews] = useState([]);

    const onImgSelected = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImgList([...imgList, reader.result]);
        };
        reader.readAsDataURL(file);
    };

    const handleImageChange = (e) => {
        console.log('123', e.target.files?.length);
        // const newImages = [...images];
        const newPreviews = [...previews];

        const newImages = [...imgList];

        for (let i = 0; i < e.target.files?.length; i++) {
            const file = e.target.files[i];

            //용량 1MB로 제한
            if (file.size > 1024 * 1024) {
                alert('1MB 이하의 파일만 업로드 가능합니다.');
                return;
            }

            // 이미지 파일 3개로 제한
            if (newImages.length < 3) {
                // 이벤트객체의 파일을 newImages에 담기
                newImages.push(file);

                // 파일리더 객체 생성
                const reader = new FileReader();
                // 파일 읽어온 후 실행되는 콜백함수
                reader.onload = (e) => {
                    // 읽어온 값을 갱신하기
                    newPreviews.push(e.target.result);
                    setPreviews(newPreviews);
                };

                // 파일 객체를 읽어 base64 형태의 문자열로 변환
                reader.readAsDataURL(file);
            }
        }
        setImgList(newImages);
    };

    const handleUpload = () => {
        formData.append('productName', productName);
        formData.append('content', content);
        formData.append('category', Number(category));
        formData.append(
            'initPrice',
            Number(initPrice.replaceAll(/[^0-9]/g, ''))
        );
        formData.append('price', Number(price.replaceAll(/[^0-9]/g, '')));
        formData.append('deadline', deadline);

        // // 이미지 파일이 없으면 리턴
        // if (imgList.length === 0) {
        //     return;
        // }

        // formData 객체 생성
        // const formData = new FormData();
        // 이미지 파일들을 formData에 담기
        for (let i = 0; i < imgList.length; i++) {
            formData.append('images', imgList[i]);
        }

        // formData에 담긴 데이터 확인
        for (let key of formData.keys()) {
            console.log(key);
        }

        // formData에 담긴 데이터 확인
        for (let value of formData.values()) {
            console.log(value);
        }

        console.log('product upload formData', formData.get('productName'));
        console.log('product upload formData', formData.get('content'));
        console.log('product upload formData', formData.get('category'));
        console.log('product upload formData', formData.get('initPrice'));
        console.log('product upload formData', formData.get('price'));
        console.log('product upload formData', formData.get('deadline'));
        console.log('formData', formData.getAll('images'));

        instance
            .post('/products', formData)
            .then((res) => {
                console.log(res.data);
                console.log(res.data.productId);
                navigate(`/detail/${res.data.productId}`);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <Box sx={{ display: 'flex', overflow: 'auto', mt: 1 }}>
                <label>
                    <Card
                        sx={{
                            width: '25vw',
                            height: '25vw',
                            maxWidth: 160,
                            maxHeight: 160,
                            m: 1,
                            borderRadius: '10px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                        }}
                    >
                        <CardMedia
                            sx={{
                                width: '60%',
                                height: '60%',
                            }}
                            component="img"
                            image="/upload.png"
                        />
                        <Typography>{`${imgList.length}/3`}</Typography>
                    </Card>

                    <input
                        // onChange={onImgSelected}
                        onChange={handleImageChange}
                        accept="image/*"
                        type="file"
                        hidden
                        multiple
                    />
                </label>
                <Box sx={{ display: 'flex', overflow: 'auto' }}>
                    {previews?.map((img, index) => {
                        return (
                            <Box
                                sx={{
                                    position: 'relative',
                                    m: 1,
                                    borderRadius: '10px',
                                }}
                            >
                                <CardMedia
                                    sx={{
                                        width: '25vw',
                                        height: '25vw',
                                        maxWidth: 160,
                                        maxHeight: 160,
                                        // m: 1,
                                        borderRadius: '10px',
                                    }}
                                    component="img"
                                    image={img}
                                />
                                {/* <input
            onChange={onImgSelected}
            accept="image/*"
            type="file"
            hidden
        /> */}
                                <IconButton
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        right: 0,
                                        color: 'red',
                                    }}
                                    onClick={() => {
                                        console.log('삭제', index);
                                        const newImgList = imgList.filter(
                                            (img, i) => i !== index
                                        );
                                        setImgList(newImgList);
                                        const newPreviews = previews.filter(
                                            (img, i) => i !== index
                                        );
                                        setPreviews(newPreviews);
                                    }}
                                >
                                    <HighlightOffIcon />
                                </IconButton>
                                {index === 0 && (
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            bgcolor: 'rgba(0, 0, 0, 0.5)',
                                            color: 'white',
                                            width: '100%',
                                            // m: 1,
                                            // width: 'auto',
                                            boxSizing: 'border-box',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderRadius: '0 0 10px 10px',
                                        }}
                                    >
                                        <Typography>썸네일</Typography>
                                    </Box>
                                )}
                            </Box>
                        );
                    })}
                </Box>
            </Box>

            <h3>상품 제목</h3>
            <TextField
                fullWidth
                size="small"
                value={productName}
                onChange={(e) => {
                    setProductName(e.target.value);
                }}
            />
            <h3>상품 설명</h3>
            <TextField
                fullWidth
                size="small"
                multiline
                minRows={3}
                value={content}
                onChange={(e) => {
                    setContent(e.target.value);
                }}
            />
            <h3>카테고리</h3>
            <FormControl fullWidth>
                <NativeSelect
                    inputProps={{
                        name: 'category',
                        id: 'uncontrolled-native',
                    }}
                    sx={{
                        mt: 2,
                        mb: 2,
                        // position: 'fixed',
                        // width: '70%',
                    }}
                    onChange={(e) => {
                        setCategory(e.target.value);
                    }}
                >
                    {CategoryList.map((category) => (
                        <option value={category.code}>{category.name}</option>
                    ))}
                </NativeSelect>
            </FormControl>
            <h3>입찰 시작가</h3>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <TextField
                    variant="outlined"
                    fullWidth
                    fontWeight={'bold'}
                    value={initPrice}
                    onChange={handleInitPrice}
                    inputProps={{
                        type: 'text',
                        style: { textAlign: 'right' },
                        inputMode: 'numeric',
                        // enterKeyHint: 'done',
                    }}
                    size="small"
                />
                <Typography variant="h6" fontWeight={'bold'}>
                    원
                </Typography>
            </Box>
            <h3>즉시 구매가 (선택)</h3>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <TextField
                    variant="outlined"
                    fullWidth
                    fontWeight={'bold'}
                    value={price}
                    onChange={handlePrice}
                    inputProps={{
                        type: 'text',
                        style: { textAlign: 'right' },
                        inputMode: 'numeric',
                        // enterKeyHint: 'done',
                    }}
                    size="small"
                />
                <Typography variant="h6" fontWeight={'bold'}>
                    원
                </Typography>
            </Box>
            <h3>마감 기한</h3>
            <DatePicker
                disablePast
                format="YYYY.MM.DD"
                slotProps={{ textField: { fullWidth: true, size: 'small' } }}
                value={endDate}
                onChange={handleDeadline}
            />

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
                <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={handleUpload}
                    disabled={
                        imgList.length === 0 ||
                        productName === '' ||
                        content === '' ||
                        initPrice === '0' ||
                        price === '0' ||
                        deadline === 0
                    }
                >
                    등록하기
                </Button>
            </Box>
        </div>
    );
}
