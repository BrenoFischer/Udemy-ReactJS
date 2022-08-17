import { useContext } from "react";

import { CartContext } from "../../context/cart.context";

import { CheckoutItemContainer, ImageContainer, Name, Quantity, Price, Arrow, Value, RemoveButton } from './checkout-item.styles';

const CheckoutItem = ({cartItem}) => {
    const {changeItemQuantityToCart, clearItemFromCart} = useContext(CartContext);
    const {name, quantity, price, imageUrl} = cartItem;

    const totalItemPrice = quantity * price;

    const subToItemQuantity = () => changeItemQuantityToCart(cartItem, -1);
    const addToItemQuantity = () => changeItemQuantityToCart(cartItem, 1);
    const clearItemHandler = () => clearItemFromCart(cartItem);

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`}/>
            </ImageContainer>
            <Name>{name}</Name>
            <Quantity>
                <Arrow onClick={subToItemQuantity}>&#10094;</Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={addToItemQuantity}>&#10095;</Arrow>
            </Quantity>
            <Price>{totalItemPrice}</Price>
            <RemoveButton onClick={clearItemHandler}>
                &#10005;
            </RemoveButton>
        </CheckoutItemContainer>
    );
}

export default CheckoutItem;