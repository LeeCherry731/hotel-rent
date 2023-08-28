import { Role } from "./role.enum";


export interface IAddUser {
    email: string;
    role: Role;
    created_at: Date;
    updated_at: Date;
}
export interface IAddHotel {
    name: string;
    phone: string;
    address: string;
    latitude: number;
    longitude: number;
    motorcycle_park: boolean;
    car_park: boolean;
    elevator: boolean;
    cctv: boolean;
    laundry_service: boolean;
    imageUrls: string[];
    created_at: Date;
    updated_at: Date;
}