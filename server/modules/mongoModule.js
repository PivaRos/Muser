
const { MongoClient, ObjectId } = require('mongodb');
const Grid = require('gridfs-stream');




class MongoModule {
    Client;
    MuserDB;
    OnActionDB;
    
    users;
    tracks;
    

    constructor(uri) {
        this.Client = new MongoClient(uri);
        this.MuserDB = this.Client.db("Muser");
        this.OnActionDB = this.Client.db("OnAction");
        this.tracks = this.MuserDB.collection("tracks");
        this.users = this.MuserDB.collection("users");
        

    }

    async getRandomTrack() {
        return await this.tracks.aggregate([{ $sample: { size: 1 } }]).toArray();
    }

    async getRandomTrackList(numberOfTracks) {
        return await this.tracks.aggregate([{ $sample: { size: numberOfTracks } }]).toArray();
    }

    async getTrackById(queryId) {
        return await this.tracks.findOne({ _id: new ObjectId(queryId) })

    }

    async addTrack(track) {
        let res;
        try {
           res = await this.tracks.insertOne({
                src: track.src,
                name: track.name,
                author: track.author,
                icon: track.icon,
                likes: 0

            });
        }
        catch {
            return false;
        }
        finally{
            return res;
        }

    }

    async getRandomTrackExclude(exclude) {
        return await this.tracks.findOne({
            _id: {
                $nin: exclude.map(id => {
                    return new ObjectId(id);
                })
            }, $expr: { $lt: [0.5, { $rand: {} }] }
        });
    }

    async MuserSearch(query) {
        const results = await this.tracks.find({ $or: [{ "name": new RegExp('.*' + query.toLowerCase() + '.*') }, { "author": new RegExp('.*' + query.toLowerCase() + '.*') }, { "name": new RegExp('.*' + query.toUpperCase() + '.*') }, { "author": new RegExp('.*' + query.toUpperCase() + '.*') }] }).toArray();// need to fix query of .find()
        const authors = [];
        results.map(track => {
            if (track.author.lenght === 1 && !authors.some(({ name }) => name === track.author)) {
                authors.push({
                    name: track.author
                });
                return;

            }
            else
            {
            track.author.forEach(author => {
             if (!authors.some(({ name }) => name === track.author))
            {
                authors.push({
                    name: author
                }); 
            }
            });
            }
            
        });
        return { tracks: results, authors: authors };
    }

    async UploadTrack(){

    }

    async getAuthor(author){
        return await this.tracks.find({author:author}).toArray();
    }
}

module.exports = MongoModule;