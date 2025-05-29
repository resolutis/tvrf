import { Box, Container, Typography } from '@mui/material';
import resolutisLogo from '../assets/resolutis-logo.png';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[100],
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Powered by
          </Typography>
          <Box
            component="img"
            src={resolutisLogo}
            alt="Resolutis Logo"
            sx={{
              height: 24,
              width: 'auto',
            }}
          />
        </Box>
      </Container>
    </Box>
  );
} 