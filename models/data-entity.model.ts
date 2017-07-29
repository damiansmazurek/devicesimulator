import { BaseData } from "./base-data.model";

export interface DataEntity extends BaseData {
    Group1: { 
        [key: string]: number;
    },
    Group2: { 
        [key: string]: number;
    },
}