import { Box, Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function OrderConfirmation() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <CheckCircleOutlineIcon
          sx={{ fontSize: 64, color: 'success.main', mb: 2 }}
        />
        <Typography variant="h4" component="h1" gutterBottom>
          Order Confirmed!
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Thank you for your order. We have sent a confirmation email with your order details.
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          We will process your order as soon as possible and send you updates via email.
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => navigate('/home')}
          sx={{ mt: 3 }}
        >
          Continue Shopping
        </Button>
      </Box>
    </Container>
  );
}
