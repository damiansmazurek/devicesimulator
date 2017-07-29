export interface DataEntity{
    timestamp: number;
    messageType: string;
    Group1: { 
        [key: string]: number;
    },
    Group2: { 
        [key: string]: number;
    },
}