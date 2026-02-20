import React, { createContext, useEffect, useState } from 'react'
import { useContext } from 'react'
import axios from 'axios'
import { authDataContext } from './authContext'
import { toast } from 'react-toastify'
import { userDataContext } from './UserContext'
export const shopDataContext= createContext();
const ShopContext = ({children}) => {
    let {userData}=useContext(userDataContext)
    const [products, setProducts] = useState([])
    const [search, setSearch]= useState('')
    const [showSearch, setShowSearch]= useState(false)
    let {serverUrl}=useContext(authDataContext)
    const [cartItem, setCartItem] = useState({})
    let [loading,setLoading] = useState(false)
    let currency="₹";
    let delivery_fee= 30
    const getProducts=async()=>{
        try {
            const response= await axios.get(serverUrl+"/api/product/list", {withCredentials:true, headers: { "Cache-Control": "no-cache" }})
            console.log(response.data);
            setProducts(response.data)
        } catch (error) {
            console.log(error);
        }
    }
    const addtoCart= async(itemId,size) => {
        if (!size) {
            console.log("Select Product Size");
            return;
        }
        let cartData = structuredClone(cartItem); // Clone the product
    
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
            } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
            }
        
            setCartItem(cartData);
        
        
            if (userData) {
            setLoading(true)
            try {
            let result = await axios.post(serverUrl + "/api/cart/add" , {itemId,size} , {withCredentials: true})
            console.log(result.data)
            toast.success("Product Added")
            setLoading(false)
        
        
            
            }
            catch (error) {
                console.log(error)
                setLoading(false)
                toast.error("Add Cart Error")
            
            }
            
            }
        }
    const getUserCart = async () => {
        try {
            const result = await axios.post(serverUrl + '/api/cart/get',{},{ withCredentials: true })

            setCartItem(result.data)
        } catch (error) {
            console.log(error)
        


        }
        
    }
    useEffect(() => {
        if (userData) {
            getUserCart();
        }
    }, [userData]);

    const updateQuantity = async (itemId , size , quantity) => {
        let cartData = structuredClone(cartItem);
        cartData[itemId][size] = quantity
        setCartItem(cartData)

        if (userData) {
            try {
                await axios.post(serverUrl + "/api/cart/update", { itemId, size, quantity }, { withCredentials: true })
                toast.success("Cart Updated")
            } catch (error) {
                console.log(error)
                toast.error("Cart Update Failed")
            }
        }
    
    }
    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItem) {
            for (const item in cartItem[items]) {
                try {
                if (cartItem[items][item] > 0) {
                    totalCount += cartItem[items][item]
                }
                } catch (error) {

                }
            }
        }
        return totalCount
    }
    const getCartAmount = () => {
    let totalAmount = 0;
        for (const items in cartItem) {
        let itemInfo = products.find((product) => product._id === items);
        for (const item in cartItem[items]) {
            try {
            if (cartItem[items][item] > 0) {
                totalAmount += itemInfo.price * cartItem[items][item];
            }
            } catch (error) {

            }
        }
    }
    return totalAmount
    }
    useEffect(()=>{
        getProducts()
    },[])
    let value= {
        products, setProducts, getProducts, currency, delivery_fee, search, setShowSearch, showSearch, setSearch,
        addtoCart, cartItem, setCartItem, updateQuantity, getCartCount, loading, setLoading, getCartAmount
    }
  return (
    <div>
        <shopDataContext.Provider value={value}>
            {children}
        </shopDataContext.Provider>
    </div>
  )
}

export default ShopContext