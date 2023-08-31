

import { configureStore } from "@reduxjs/toolkit";
import dataReducer from '../features/dataSlice'
import registerReducer from '../features/auth/registerSlice'
import loginReducer from '../features/auth/loginSlice'
import verifyReducer from '../features/auth/otpSlice'

export const store = configureStore({
    
    reducer: {
        data: dataReducer,
        register: registerReducer, 
        login: loginReducer,
        verify:verifyReducer
    }
})

