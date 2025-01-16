import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box } from '@mui/material';
import CategoryNav from '../components/CategoryNav';
import HeroSlider from '../components/HeroSlider';
import CategoryGrid from '../components/CategoryGrid';
import Features from '../components/Features';
import Newsletter from '../components/Newsletter';
import { heroSlides, categories } from '../data/homeData';

const fallbackImage = '/images/placeholderImage.jpeg';

export default function Home(): JSX.Element {
  return (
    <Box>
      <HeroSlider slides={heroSlides} fallbackImage={fallbackImage} />
      <CategoryNav />
      <CategoryGrid categories={categories} />
      <Features />
      <Newsletter />
    </Box>
  );
}