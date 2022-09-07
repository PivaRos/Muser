
const { MongoClient, ObjectId } = require('mongodb');

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

    async getRandomTrackList(numberOfTracks) {
        return await this.tracks.aggregate([{ $sample: { size: numberOfTracks } }]).toArray();
    }

    async getTrackById(queryId) {
        return await this.tracks.findOne({ _id: new ObjectId(queryId) })

    }

    async addTrack(track) {
        try {
            await this.tracks.insertOne({
                src: track.src,
                name: track.name,
                author: track.author,
                icon: track.icon,
                likes: 0

            }, err => {
                if (!err) {
                    return true;
                }
                return false;
            })
        }
        catch {
            return false;
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
            if (!authors.some(({ name }) => name === track.author)) {
                authors.push({
                    name: track.author
                });
                return;

            }
        });
        return { tracks: results, authors: authors };
    }



}


module.exports = MongoModule;