import { Box, Container } from '@mui/material';
import TopAppBar from './TopAppBar';
import BottomAppBar from './BottomAppBar';
import BottomNav from './BottomNav';
import { styled } from '@mui/material/styles';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { authState } from 'recoil/auth';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

export default function MobileLayout({ children }) {
    const [auth, setAuth] = useRecoilState(authState);
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
        >
            <TopAppBar />
            {/*dm */}
            <Container maxWidth="md" sx={{ mt: 1 }}>
                {/* {auth.nickname ? <Offset /> : null} */}
                {children}
            </Container>
            {/* <BottomAppBar /> */}
            <BottomNav />
        </Box>
    );
}
