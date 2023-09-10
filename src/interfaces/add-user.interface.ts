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
    line: string;

    map_url: string;

    address: string;

    motorcycle_park: boolean;
    car_park: boolean;
    elevator: boolean;
    cctv: boolean;
    laundry_service: boolean;
    wifi: boolean;
    furniture: boolean;
    air: boolean;

    min_price: number;
    max_price: number;

    fan: boolean;
    tv: boolean;
    fridge: boolean;
    pool: boolean;
    gym: boolean;

    imageUrls: string[];
    created_at: Date;
    updated_at: Date;
}