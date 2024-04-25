import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function NavIconButton({ icon, text, url }) {
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            onClick={() => navigate(url)}
        >
            {icon}
            <Typography
                variant="caption"
                sx={{
                    color: 'black',
                    fontWeight: 'bold',
                }}
            >
                {text}
            </Typography>
        </Box>
    );
}
