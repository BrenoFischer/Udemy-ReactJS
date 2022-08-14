import { createContext, useEffect, useState } from "react";

const findItem = (cartItems, item) => {
    return cartItems.find((cartItem) => cartItem.id === item.id);
}

const removeCartItem = (cartItems, itemToRemove) => {
    const existingCartItem = findItem(cartItems, itemToRemove);

    if (existingCartItem) {
        return cartItems.filter((cartItem) => {
            return cartItem.id !== itemToRemove.id 
        })
    }
    return [...cartItems];
}

const changeItemQuantity = (cartItems, productToChange, change) => {
    const existingCartItem = findItem(cartItems, productToChange);

    if (existingCartItem) {
        if (productToChange.quantity + change === 0) {
            return removeCartItem(cartItems, productToChange);
        }
        return cartItems.map((cartItem) => {
            return cartItem.id === productToChange.id 
            ? {...cartItem, quantity: cartItem.quantity + change}
            : cartItem
        })
    }
    return [...cartItems];
}

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = findItem(cartItems, productToAdd);

    if (existingCartItem) {
        return cartItems.map((cartItem) => {
            return cartItem.id === productToAdd.id 
            ? {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
        })
    }
    return [...cartItems, {...productToAdd, quantity: 1}];
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => null,
    cartItems: [],
    addItemToCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    totalPrice: 0,
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems])

    useEffect(() => {
        const newTotalPrice = cartItems.reduce((total, cartItem) => total + (cartItem.price * cartItem.quantity), 0);
        setTotalPrice(newTotalPrice);
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const changeItemQuantityToCart = (productToChange, change) => {
        setCartItems(changeItemQuantity(cartItems, productToChange, change));
    }

    const clearItemFromCart = (productToRemove) => {
        setCartItems(changeItemQuantity(cartItems, productToRemove, -productToRemove.quantity));
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, totalPrice, changeItemQuantityToCart, clearItemFromCart};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};