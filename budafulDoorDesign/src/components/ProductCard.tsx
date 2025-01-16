import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addItem } from '../store/cartSlice';
import { Product } from '../types';
import { AppDispatch } from '../store';
import { Card, CardMedia, CardContent, Typography, Button, Box } from '@mui/material';

type ProductCardProps = Product;

export default function ProductCard({ id, name, price, image, description }: ProductCardProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = (): void => {
    dispatch(addItem({ id, name, price, image, quantity: 1 }));
  };

  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
    >
      <CardMedia
        component={Link}
        to={`/product/${id}`}
        sx={{
          height: 200,
          position: 'relative',
          '&:hover': {
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
            },
          },
        }}
      >
        <img
          src={image}
          alt={name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </CardMedia>

      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography
          component={Link}
          to={`/product/${id}`}
          variant="h6"
          sx={{
            mb: 1,
            color: 'text.primary',
            textDecoration: 'none',
            '&:hover': {
              color: 'primary.main',
            },
          }}
        >
          {name}
        </Typography>

        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ 
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {description}
        </Typography>

        <Box sx={{ 
          mt: 'auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Typography 
            variant="h6" 
            color="primary"
            sx={{ fontWeight: 'bold' }}
          >
            ${price.toFixed(2)}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={handleAddToCart}
            sx={{
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            }}
          >
            Add to Cart
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
