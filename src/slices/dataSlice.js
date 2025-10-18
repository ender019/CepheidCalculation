import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux";


const dataSlice = createSlice({
    name: "data",
    initialState: {
        Data: [
            {
                "id": 1,
                "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
                "price": 109,
                "category": "men's clothing",
                "rating": {
                    "rate": 3.9,
                    "count": 120
                }
            },
            {
                "id":2,
                "title":"Mens Casual Premium Slim Fit T-Shirts ",
                "price":22,
                "category":"men's clothing",
                "rating":{
                    "rate":4.1,
                    "count":259
                }
            }
        ],
        Query: 0,
    },
    reducers: {
        setData(state, {payload}) {  // изменяем состояние на полученные данные
            state.Data = payload
        },
        setQuery(state, {payload}) {  // суммируем цены выбранных товаров
            state.Query = payload
        }
    }
})

export const useData = () =>
    useSelector((state) => state.ourData.Data)

export const useSum = () =>
    useSelector((state) => state.ourData.SumShoppingCart)

export const {
    setData: setDataAction,
    setQuery: setSumAction,
} = dataSlice.actions


export default dataSlice.reducer