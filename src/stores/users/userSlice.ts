import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Role } from '../../interfaces/role.enum';

export interface userState {
    id: string;
    name: string;
    email: string;
    role: Role;
    phone: string;
    line: string;
}

const getRole = (): Role => {
    const role = localStorage.getItem("role")
    switch (role) {
        case "member":
            return Role.member

        case "admin":
            return Role.admin

        case "none":
            return Role.none

        default:
            return Role.none;
    }

}

const initialState: { info: userState } = {
    info: {
        id: localStorage.getItem("id") ?? "",
        name: localStorage.getItem("name") ?? "",
        email: localStorage.getItem("email") ?? "",
        role: getRole(),
        phone: localStorage.getItem("phone") ?? "",
        line: localStorage.getItem("line") ?? "",
    }
}

export const userSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setDefaltUser: (state) => {
            state.info.id = localStorage.getItem("id") ?? ""
            state.info.name = localStorage.getItem("name") ?? ""
            state.info.email = localStorage.getItem("email") ?? ""
            state.info.role = getRole()
            state.info.phone = localStorage.getItem("phone") ?? ""
            state.info.line = localStorage.getItem("line") ?? ""
            console.log(state)

        },
        setUser: (state, action: PayloadAction<userState>) => {
            localStorage.setItem("id", action.payload.id)
            localStorage.setItem("name", action.payload.name)
            localStorage.setItem("email", action.payload.email)
            localStorage.setItem("role", action.payload.role.toString())
            localStorage.setItem("phone", action.payload.phone)
            localStorage.setItem("line", action.payload.line)
            state.info = action.payload;
        },
        logout: (state,) => {
            localStorage.setItem("id", "")
            localStorage.setItem("name", "")
            localStorage.setItem("email", "")
            localStorage.setItem("role", "")
            localStorage.setItem("phone", "")
            localStorage.setItem("line", "")
            const userInfo = {
                id: "",
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
export const { setUser, logout, setDefaltUser } = userSlice.actions

export default userSlice.reducer