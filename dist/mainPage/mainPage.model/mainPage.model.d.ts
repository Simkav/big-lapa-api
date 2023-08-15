import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
export interface MainModel extends Base {
}
export declare class MainModel extends TimeStamps {
    first_phoneNumber: string;
    second_phoneNumber: string;
    email: string;
}
