import { CartItemContainer, ItemDetails } from './cart-item.styles';

import { FC, memo } from 'react';

import { CartItem as TCartItem } from '../../store/cart/cart.types';

type CartItemProps = {
  cartItem: TCartItem;
};

// eslint-disable-next-line react/display-name
const CartItem: FC<CartItemProps> = memo(({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <CartItemContainer>
      <img src={imageUrl} alt={name} />
      <ItemDetails>
        <span className='name'>{name}</span>
        <span className='price'>
          {quantity} x {price}€
        </span>
      </ItemDetails>
    </CartItemContainer>
  );
});

export default CartItem;
