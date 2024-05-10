import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Grid, Pagination } from '@mui/material';
import ItemCard from 'components/ItemCard';
import Types from 'constants/Types';
import { useGetProducts } from 'react-query/product';

export default function ProductListPage() {
    const { type } = useParams();

    const title = Types[type];

    let items = {
        content: [
            {
                thumbnail:
                    'https://img2.joongna.com/media/original/2024/03/17/1710645436384Kc2_801pd.jpg?impolicy=resizeWatermark3&isSecret=false',
                productName: '엔틱 화장대 휴지통 쓰레기통',
                category: '인테리어소품',
                productId: 1,
                bidPrice: 16000,
                price: 16000,
                state: 1,
                deadline: '2024-05-08T15:00:00',
            },
            {
                thumbnail:
                    'https://img2.joongna.com/media/original/2024/05/03/1714735413881laU_lnzAM.jpg?impolicy=resizeWatermark3&isSecret=false',
                productName: '나뚜찌 소피탈리 이태리 전체 천연가죽 1인소파',
                category: '거실가구',
                productId: 2,
                bidPrice: 504000,
                price: 504000,
                state: 1,
                deadline: '2024-05-10T15:00:00',
            },
            {
                thumbnail:
                    'https://img2.joongna.com/media/original/2024/04/30/1714462091237El8_Y5C0r.jpg?impolicy=resizeWatermark3&isSecret=false',
                productName: '수제 침구류 세트 (이불,베개커버,메일속,침대커버)',
                category: '침구',
                productId: 3,
                bidPrice: 300000,
                price: 300000,
                state: 1,
                deadline: '2024-05-11T15:00:00',
            },
            {
                thumbnail:
                    'https://img2.joongna.com/media/original/2024/05/03/1714735225636bjj_d14pd.jpg?impolicy=resizeWatermark3&isSecret=false',
                productName: '칼리아 이탈리아 이태리 전체 천연가죽 4인 소파',
                category: '거실가구',
                productId: 4,
                bidPrice: 980000,
                price: 1862000,
                state: 0,
                deadline: '2024-05-07T15:00:00',
            },
            {
                thumbnail:
                    'https://img2.joongna.com/cafe-article-data/live/2024/05/03/1054222768/1714735155932_000_a9oZM_main.jpg?impolicy=resizeWatermark3&isSecret=false',
                productName: '레오나갤럭시 왕대품',
                category: '인테리어소품',
                productId: 5,
                bidPrice: 90000,
                price: 90000,
                state: 1,
                deadline: '2024-05-11T15:00:00',
            },
            {
                thumbnail:
                    'https://img2.joongna.com/media/original/2024/05/03/1714734953852HuA_m1kRK.jpg?impolicy=resizeWatermark3&isSecret=false',
                productName: '체스터필드 이태리 전체 천연가죽 3인+1인소파',
                category: '거실가구',
                productId: 6,
                bidPrice: 3380000,
                price: 5070000,
                state: 0,
                deadline: '2024-05-11T15:00:00',
            },
            {
                thumbnail:
                    'https://img2.joongna.com/media/original/2024/05/02/1714645961360NJC_1k8vZ.jpg?impolicy=resizeWatermark3&isSecret=false',
                productName: '제라늄 다이아하얀목련',
                category: '인테리어소품',
                productId: 7,
                bidPrice: 7000,
                price: 7000,
                state: 0,
                deadline: '2024-05-10T15:00:00',
            },
            {
                thumbnail:
                    'https://img2.joongna.com/media/original/2024/05/02/1714647161957yDp_S5hOa.jpg?impolicy=resizeWatermark3&isSecret=false',
                productName: '제라늄 도넛모나리자',
                category: '인테리어소품',
                productId: 8,
                bidPrice: 9000,
                price: 9000,
                state: 0,
                deadline: '2024-05-13T15:00:00',
            },
            {
                thumbnail:
                    'https://img2.joongna.com/media/original/2024/05/02/17146476286356ix_4eEW6.jpg?impolicy=resizeWatermark3&isSecret=false',
                productName: '제라늄 샤이아망떼',
                category: '인테리어소품',
                productId: 9,
                bidPrice: 22000,
                price: 22000,
                state: 1,
                deadline: '2024-05-12T15:00:00',
            },
            {
                thumbnail:
                    'https://img2.joongna.com/media/original/2024/03/27/17115177014334bg_MAVHt.jpg?isSecret=false&impolicy=resizeWatermark3',
                productName:
                    '빈티지액자 플로럴액자 빈티지플로럴 액자 빈티지소품',
                category: '인테리어소품',
                productId: 10,
                bidPrice: 100000,
                price: 133000,
                state: 0,
                deadline: '2024-05-12T15:00:00',
            },
            {
                thumbnail:
                    'https://img2.joongna.com/media/original/2024/05/03/1714734100343O9k_9F7f6.jpg?isSecret=false&impolicy=resizeWatermark3',
                productName: '카페의자 식당의자 35개',
                category: '주방가구',
                productId: 11,
                bidPrice: 43000,
                price: 43000,
                state: 1,
                deadline: '2024-05-07T15:00:00',
            },
            {
                thumbnail:
                    'https://img2.joongna.com/media/original/2024/04/06/1712401776316LYH_S3Ry6.jpg?impolicy=resizeWatermark3&isSecret=false',
                productName: '벨기에 대형 전통 카페트 - BE605 -',
                category: '커튼/카페트',
                productId: 12,
                bidPrice: 180000,
                price: 306000,
                state: 0,
                deadline: '2024-05-13T15:00:00',
            },
        ],
        pageable: {
            pageNumber: 0,
            pageSize: 12,
            sort: {
                sorted: false,
                empty: true,
                unsorted: true,
            },
            offset: 0,
            paged: true,
            unpaged: false,
        },
        totalPages: 317,
        totalElements: 3799,
        last: false,
        size: 12,
        number: 0,
        sort: {
            sorted: false,
            empty: true,
            unsorted: true,
        },
        numberOfElements: 12,
        first: true,
        empty: false,
    };

    const [pageNum, setPageNum] = useState(0);
    const [size, setSize] = useState(12);

    const handleChangePage = (event, value) => {
        setPageNum(value - 1);
    };

    const { products } = useGetProducts({
        pageNum,
        size,
    });

    return (
        <div>
            <h1>{title}</h1>
            <Grid container spacing={2}>
                {products?.content?.map((item, index) => (
                    <Grid
                        item
                        key={index}
                        xs={6}
                        sm={4}
                        md={3}
                        sx={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <ItemCard item={item} />
                    </Grid>
                ))}
            </Grid>
            <Box
                sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}
            >
                <Pagination
                    count={products?.totalPages || 1}
                    color="primary"
                    page={pageNum + 1}
                    onChange={handleChangePage}
                />
            </Box>
        </div>
    );
}
