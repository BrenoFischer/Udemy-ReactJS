import { createContext, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

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

export const CART_ACTION_TYPES = {
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
    SET_CART_ITEMS: 'SET_CART_ITEMS',
}

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch(type) {
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }

        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }

        default:
            throw new Error(`Unhandled type ${type} in cartReducer`)
    }
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    totalPrice: 0,
}

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
    const { isCartOpen, cartItems, cartCount, totalPrice } = state;

    const updateCartItemsReducer = (newCartItems) => {
        const newTotalPrice = newCartItems.reduce((total, cartItem) => total + (cartItem.price * cartItem.quantity), 0);
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);

        dispatch(
            createAction(
                CART_ACTION_TYPES.SET_CART_ITEMS,
                { 
                    cartItems: newCartItems,
                    cartCount: newCartCount,
                    totalPrice: newTotalPrice
                }
            )
        );
    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    }

    const changeItemQuantityToCart = (productToChange, change) => {
        const newCartItems = changeItemQuantity(cartItems, productToChange, change);
        updateCartItemsReducer(newCartItems );
    }

    const clearItemFromCart = (productToRemove) => {
        const newCartItems = changeItemQuantity(cartItems, productToRemove, -productToRemove.quantity);
        updateCartItemsReducer(newCartItems);
    }

    const setIsCartOpen = (bool) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, totalPrice, changeItemQuantityToCart, clearItemFromCart};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};