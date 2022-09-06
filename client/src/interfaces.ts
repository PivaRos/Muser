export interface track {
    src:string;
    name:string;
    author:string;
    icon:string;
    likes:number;
    _id:string;
}

export interface Author{
    name:string;
}

export interface QueryResults {
    error:boolean;
    Authors:Author[];
    Tracks:track[];
}