import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Header from './components/Header';
import CategoryNav from './components/CategoryNav';
import Cart from './components/Cart';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6B46C1', 
      light: '#9F7AEA',
      dark: '#553C9A',
    },
    secondary: {
      main: '#38A169', 
      light: '#68D391',
      dark: '#2F855A',
    },
    background: {
      default: '#F7FAFC',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          padding: '8px 16px',
        },
      },
    },
  },
});

// Wrapper component to conditionally render CategoryNav
function AppContent(): JSX.Element {
  const location = useLocation();
  const showCategoryNav = location.pathname === '/products';

  return (
    <Box sx={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      bgcolor: 'background.default'
    }}>
      <Header />
      {showCategoryNav && <CategoryNav />}
      <Cart />
      <Box component="main" sx={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
}

export default function App(): JSX.Element {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </Provider>
  );
}
