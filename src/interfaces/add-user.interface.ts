import { FieldValue, serverTimestamp } from "firebase/firestore";
import { Role } from "./role.enum";


export interface IAddUser {
    name: string;
    email: string;
    role: Role;
    phone: string;
    line: string;
    created_at: Date;
    updated_at: Date;
}
export interface IAddHotel {
    id: string;
    userId: string;
    name: string;
    phone: string;
    line: string;
    type: string;
    map_url: string;

    address: string;

    promote: boolean;

    price: number;
    min_price: number;
    max_price: number;
    bail: number;
    prepay: number;
    electricity_bill: number;
    water_bill: number;

    air: boolean;
    furniture: boolean;
    water_heater: boolean;
    fan: boolean;
    tv: boolean;
    fridge: boolean;
    pet: boolean;
    cigarette: boolean;
    motorcycle_park: boolean;
    car_park: boolean;
    elevator: boolean;
    wifi: boolean;
    security: boolean;
    cctv: boolean;
    laundry_service: boolean;

    imageUrls: string[];
    created_at: FieldValue;
    updated_at: FieldValue;
}