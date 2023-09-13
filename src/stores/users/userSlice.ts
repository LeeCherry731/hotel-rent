import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Role } from '../../interfaces/role.enum';

export interface userState {
    name: string;
    email: string;
    role: Role;
    phone: string;
    line: string;
}

const initialState: { info: userState } = {
    info: {
        name: "",
        email: "",
        role: Role.none,
        phone: "",
        line: "",
    }
}

export const userSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<userState>) => {
            state.info = action.payload;
        },
        logout: (state,) => {
            const userInfo = {
                name: "",
                email: "",
                role: Role.none,
                phone: "",
                line: "",
            };
            state.info = userInfo;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setUser, logout } = userSlice.actions

export default userSlice.reducer