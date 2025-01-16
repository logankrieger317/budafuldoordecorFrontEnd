import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { RootState, AppDispatch } from '../store';
import { toggleCart, removeItem, updateQuantity } from '../store/cartSlice';
import { Link } from 'react-router-dom';

export default function Cart(): JSX.Element | null {
  const dispatch = useDispatch<AppDispatch>();
  const { items, isOpen } = useSelector((state: RootState) => state.cart);
  
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  const handleQuantityUpdate = (id: string, quantity: number): void => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemoveItem = (id: string): void => {
    dispatch(removeItem(id));
  };

  return (
    <Drawer 
      anchor="right" 
      open={isOpen} 
      onClose={() => dispatch(toggleCart())}
      ModalProps={{
        keepMounted: false,
        disableScrollLock: true
      }}
      sx={{
        '& .MuiDrawer-paper': { width: 300 },
        '& .MuiBackdrop-root': {
          display: isOpen ? 'block' : 'none'
        }
      }}
    >
      <Box sx={{ width: 300, p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Your Cart</Typography>
          <IconButton onClick={() => dispatch(toggleCart())}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <List>
          {items.map((item, index) => (
            <ListItem key={index} sx={{ py: 1 }}>
              <ListItemText
                primary={item.name}
                secondary={`Quantity: ${item.quantity} | Price: $${item.price}`}
              />
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleQuantityUpdate(item.id, item.quantity - 1)}
                  sx={{ minWidth: 30 }}
                >
                  -
                </Button>
                <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleQuantityUpdate(item.id, item.quantity + 1)}
                  sx={{ minWidth: 30 }}
                >
                  +
                </Button>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleRemoveItem(item.id)}
                  sx={{ ml: 1 }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Box sx={{ mt: 2, textAlign: 'right' }}>
          <Typography variant="subtitle1">Total: ${total.toFixed(2)}</Typography>
          <Link to="/checkout" onClick={() => dispatch(toggleCart())}>
            <Button variant="contained" color="primary" fullWidth sx={{ mt: 1 }}>
              Checkout
            </Button>
          </Link>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 1 }}
            onClick={() => dispatch(toggleCart())}
          >
            Continue Shopping
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
