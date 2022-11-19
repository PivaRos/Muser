export interface track {
    src: string;
    name: string;
    author: string[];
    icon: string;
    likes: number;
    _id: string;
}

export interface author {
    name: string;

}

export interface QueryResults {
    error: boolean;
    Authors: author[];
    Tracks: track[];
}
export interface User {
    _id:string;
    username:string;
    password:string;
    email:string;
    likedtracks:string[];
    avatar:string;
    sessionid:string;
    online:boolean;
}

export interface Playlist {
    name:string;
    tracks:track[];
    icon:null | undefined | string;
}