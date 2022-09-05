
const {MongoClient, ObjectId} = require('mongodb');

 class MongoModule {
    Client;
    MuserDB;
    tracks;

    constructor(uri) {
        this.Client = new MongoClient(uri);
        this.MuserDB = this.Client.db("Muser");
        this.tracks = this.MuserDB.collection("tracks");
    }

    async getRandomTrack() {
       return await this.tracks.aggregate([{ $sample: { size: 1 } }]).toArray();
    }

    async getTrackById(queryId) {
        return await this.tracks.findOne({_id:new ObjectId(queryId)})

    }

    async addTrack(track){
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

    async getTrackExclude(ids)
    {
        return await this.tracks.findOne({_id:{$nin:ids}, $expr: { $lt: [0.5, {$rand: {} } ] }});
    }

}


module.exports = MongoModule;