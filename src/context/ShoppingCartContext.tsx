import { FC, createContext, useState } from "react";
import { CartItem } from "../types";
import { ShoppingCart } from "../components/Cart";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface ShoppingCartContext {
    openCart: () => void
    closeCart: () => void
    getItemQuantity: (id: number) => number
    addItemIntoCart: (id: number) => void
    deleteItemFromCart: (id: number, force?: boolean) => void
    cartQuantity: number
    cartItems: CartItem[]
}

export const ShoppingCartContext = createContext({} as ShoppingCartContext)

interface ShoppingCartProviderProps {
    children: JSX.Element | JSX.Element[]
}

const ShoppingCartProvider: FC<ShoppingCartProviderProps> = ({ children }) => {

    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
        "shopping-cart",
        []
    )
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false)

    const cartQuantity = cartItems.reduce( (total, item) => total + item.quantity, 0);

    function isItemIntoCart(id: number) {
        return cartItems.some(item => item.id === id);
    }

    function getItemQuantity(id: number) {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    function addItemIntoCart(id: number) {

        if (isItemIntoCart(id)) {
            let newArray = [...cartItems]
            let foundIndex = newArray.findIndex(item => item.id === id);
            newArray[foundIndex].quantity++;
            setCartItems(newArray)
        }
        else {
            let cartItem = { id, quantity: 1 };
            setCartItems([...cartItems, cartItem]);
        }
    }

    function deleteItemFromCart(id: number, force?: boolean) {
        if(force){
            let arrayWithoutFound = cartItems.filter(item => item.id !== id);
            setCartItems(arrayWithoutFound);
        }
        else {
            let newArray = [...cartItems]
            let foundIndex = newArray.findIndex((item) => item.id === id);

            if (newArray[foundIndex].quantity > 1) {
                newArray[foundIndex].quantity--;
                setCartItems(newArray)
            }
            else {
                let arrayWithoutFound = cartItems.filter(item => item.id !== id);
                setCartItems(arrayWithoutFound);
            }
        }
    }

    const openCart = () => setIsCartOpen(true)
    const closeCart = () => setIsCartOpen(false)

    return (
        <ShoppingCartContext.Provider value={{ 
            cartItems, 
            cartQuantity,
            getItemQuantity, 
            addItemIntoCart, 
            deleteItemFromCart, 
            openCart, 
            closeCart 
        }}>
            <ShoppingCart isOpen={isCartOpen}/>
            {children}
        </ShoppingCartContext.Provider>
    );
}

export default ShoppingCartProvider;
