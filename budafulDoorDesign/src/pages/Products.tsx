import { Container, Typography, Grid, Box } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

import { Product } from '../types';

// Sample products data organized by category
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Spring Door Hanger',
    price: 24.99,
    image: '/images/CounterPlaceholder.jpeg',
    description: 'Beautiful spring-themed door hanger.',
    category: 'seasonal'
  },
  {
    id: '2',
    name: 'Summer Wreath',
    price: 29.99,
    image: '/images/HomeComing.jpeg',
    description: 'Vibrant summer wreath with mixed flowers.',
    category: 'seasonal'
  },
  {
    id: '3',
    name: 'Premium Silk Roses',
    price: 12.99,
    image: '/images/FloralPlaceholder.jpeg',
    description: 'High-quality silk roses in various colors.',
    category: 'florals'
  },
  {
    id: '4',
    name: 'Artificial Eucalyptus',
    price: 15.99,
    image: '/images/GreeneryPlaceholder.jpeg',
    description: 'Realistic artificial eucalyptus stems.',
    category: 'greenery'
  },
  {
    id: '5',
    name: 'Luxury Ribbon Bundle',
    price: 18.99,
    image: '/images/sampleRibbon.jpeg',
    description: 'Assorted premium ribbons for crafting.',
    category: 'ribbons'
  },
  {
    id: '6',
    name: 'Rustic Basket',
    price: 22.99,
    image: '/images/ContainersPlaceholder.jpeg',
    description: 'Handcrafted rustic basket for arrangements.',
    category: 'containers'
  },
  {
    id: '7',
    name: 'Custom Door Sign',
    price: 34.99,
    image: '/images/CounterPlaceholder.jpeg',
    description: 'Personalized door sign, made to order.',
    category: 'custom'
  },
  {
    id: '8',
    name: 'Red Ribbon',
    price: 5.99,
    image: '/images/sampleRedRibbon.jpeg',
    description: 'Red ribbon for your door.',
    category: 'ribbons'
  },
  {
    id: '9',
    name: 'Green Ribbon',
    price: 5.99,
    image: '/images/sampleRibbonGreen.jpeg',
    description: 'Green ribbon for your door.',
    category: 'ribbons'
  },
  {
    id: '10',
    name: 'Blue Ribbon',
    price: 5.99,
    image: '/images/sampleRibbonBlue.jpeg',
    description: 'Blue ribbon for your door.',
    category: 'ribbons'
  },
  {
    id: '11',
    name: 'Yellow Ribbon',
    price: 5.99,
    image: '/images/sampleRibbonYellow.jpeg',
    description: 'Yellow ribbon for your door.',
    category: 'ribbons'
  },
  {
    id: '12',
    name: 'Orange Ribbon',
    price: 5.99,
    image: '/images/sampleRibbonOrange.jpeg',
    description: 'Orange ribbon for your door.',
    category: 'ribbons'
  },
  {
    id: '13',
    name: 'Purple Ribbon',
    price: 5.99,
    image: '/images/sampleRibbonPurple.jpeg',
    description: 'Purple ribbon for your door.',
    category: 'ribbons'
  }
];

const categories = [
  { id: 'seasonal', name: 'Seasonal' },
  { id: 'florals', name: 'Florals' },
  { id: 'greenery', name: 'Greenery' },
  { id: 'ribbons', name: 'Ribbons' },
  { id: 'containers', name: 'Containers' },
  { id: 'custom', name: 'Custom' },
];

export default function Products(): JSX.Element {
  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || 'all';

  const filteredProducts = currentCategory === 'all'
    ? sampleProducts
    : sampleProducts.filter(product => product.category === currentCategory);

  return (
    <Box>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            mb: 4,
            fontWeight: 'bold',
            color: 'text.primary'
          }}
        >
          {currentCategory === 'all' 
            ? 'All Products'
            : categories.find(cat => cat.id === currentCategory)?.name || 'Products'}
        </Typography>
        
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard {...product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
