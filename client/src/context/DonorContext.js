import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';


// Initial state for the reducer
const initialState = {
    donors: [],
    loading: true,
    error: null,
};


// Reducer function
const donorReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_SUCCESS':
            return {
                ...state,
                donors: action.payload,
                loading: false,
                error: null,
            };
        case 'FETCH_ERROR':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case 'ADD_DONOR_SUCCESS':
            return {
                ...state,
                donors: [...state.donors, action.payload],
            };
        case 'ADD_DONOR_ERROR':
            return state; // You can handle error state for adding donor here if needed
        default:
            return state;
    }
};


const DonorContext = createContext();


export const DonorProvider = ({ children }) => {
    const [state, dispatch] = useReducer(donorReducer, initialState);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/donor'); // Replace with your actual API endpoint
                dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
            } catch (error) {
                dispatch({ type: 'FETCH_ERROR', payload: error.message });
            }
        };


        fetchData();
    }, []);


    const addDonor = async (newDonor) => {
        try {
            const response = await axios.post('http://localhost:5000/api/donor', newDonor); // Replace with your actual API endpoint
            dispatch({ type: 'ADD_DONOR_SUCCESS', payload: response.data });
        } catch (error) {
            dispatch({ type: 'ADD_DONOR_ERROR' });
        }
    };


    return (
        <DonorContext.Provider value={{ ...state, addDonor }}>
            {children}
        </DonorContext.Provider>
    );
};


export const useDonorContext = () => {
    return useContext(DonorContext);
};