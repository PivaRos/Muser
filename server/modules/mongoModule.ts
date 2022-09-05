

import {MongoClient, ObjectId} from 'mongodb';
import {track} from '../interfaces';

export class MongoModule {
    Client;
    MuserDB;
    tracks;

    constructor(uri:string) {
        this.Client = new MongoClient(uri);
        this.MuserDB = this.Client.db("Muser");
        this.tracks = this.MuserDB.collection("tracks");
    }

    async getRandomTrack() {
       return await this.tracks.aggregate([{ $sample: { size: 1 } }]).toArray();
    }

    async getTrackById(queryId:string) {
        return await this.tracks.findOne({_id:new ObjectId(queryId)})

    }

    async addTrack(track : track){
        try{
            await this.tracks.insertOne({
                src:track.src,
                name:track.name,
                author:track.author,
                icon:track.icon,
                likes:0

            }, err => {
                if(!err)
                {
                    return true;
                }
                return false;
            })
        }
        catch{
            return false;
        }

    }

    async getTrackExclude(ids : string[])
    {
        return await this.tracks.aggregate([{_id:{$nin:ids.map((id) => {
            return new ObjectId(id);
        })}} ,{ $sample: { size: 1 } }]).toArray();
    }

}
