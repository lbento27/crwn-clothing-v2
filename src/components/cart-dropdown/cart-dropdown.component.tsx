import { CartDropDownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles';

//import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

//import { CartContext } from '../../contexts/cart.context';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { useCallback } from 'react';

const CartDropDown = () => {
  //const { cartItems } = useContext(CartContext);
  const cartItems = useSelector(selectCartItems);

  const navigate = useNavigate();

  const goToCheckOutHandler = useCallback(() => {
    navigate('/checkout');
  }, [navigate]);

  return (
    <CartDropDownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={goToCheckOutHandler}>GO TO CHECKOUT</Button>
    </CartDropDownContainer>
  );
};

export default CartDropDown;
