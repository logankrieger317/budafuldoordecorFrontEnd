import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import Header from "./components/Header";
import CategoryNav from "./components/CategoryNav";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import NotFound from "./pages/NotFound";
import React from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6B46C1",
      light: "#9F7AEA",
      dark: "#553C9A",
    },
    secondary: {
      main: "#38A169",
      light: "#68D391",
      dark: "#2F855A",
    },
    background: {
      default: "#F7FAFC",
      paper: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "3.5rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "2.5rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.7,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "8px",
          padding: "8px 16px",
        },
      },
    },
  },
});

// Wrapper component to handle redirects and navigation
function AppContent(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const showCategoryNav =
    location.pathname === "/" || location.pathname === "/products";

  // Use effect to handle initial navigation
  React.useEffect(() => {
    // Get the hash without the '#' symbol
    const hash = window.location.hash.slice(1);
    
    if (hash && hash !== '/') {
      // Navigate to the hash route
      navigate(hash);
    }
  }, [navigate]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
      }}
    >
      <Header />
      {showCategoryNav && <CategoryNav />}
      <Box component="main" sx={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
      <Cart />
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
