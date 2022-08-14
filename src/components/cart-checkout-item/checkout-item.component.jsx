import { useContext } from "react";

import { CartContext } from "../../context/cart.context";

import './checkout-item.styles.scss';

const CheckoutItem = ({cartItem}) => {
    const {changeItemQuantityToCart, clearItemFromCart} = useContext(CartContext);
    const {name, quantity, price, imageUrl} = cartItem;

    const totalItemPrice = quantity * price;

    const subToItemQuantity = () => changeItemQuantityToCart(cartItem, -1);
    const addToItemQuantity = () => changeItemQuantityToCart(cartItem, 1);
    const clearItemHandler = () => clearItemFromCart(cartItem);

    return (
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} alt={`${name}`}/>
            </div>
            <span className="name">{name}</span>
            <span className="quantity">
                <div className="arrow" onClick={subToItemQuantity}>&#10094;</div>
                <span className="value">{quantity}</span>
                <div className="arrow" onClick={addToItemQuantity}>&#10095;</div>
            </span>
            <span className="price">{totalItemPrice}</span>
            <div className="remove-button" onClick={clearItemHandler}>
                &#10005;
            </div>
        </div>
    );
}

export default CheckoutItem;