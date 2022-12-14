
const { MongoClient, ObjectId } = require('mongodb');
const Grid = require('gridfs-stream');
const { compile } = require('jade');




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

    async getTracksListById(queryIds) {
        return await this.tracks.find({ _id: {$in:queryIds.map((id) => {
            return new ObjectId(id);
        })}});

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

    /**
    * 
    * @param {string} sessionid 
    * @param {string} imageName 
    *
    */
    async updateUserIcon(sessionid, imageName){
       return await this.users.updateOne({sessionid:sessionid }, { $set:{ avatar : imageName } } );
    }


    /**
    * returns random track that does not included in the exclude param
    * @param {string[]} exclude 
    * array of the Ids of the tracks you want to exclude or null
    */
    async getRandomTrackExclude(exclude) {
        return await this.tracks.findOne({
            _id: {
                $nin: exclude.map(id => {
                    return new ObjectId(id);
                })
            }, $expr: { $lt: [0.5, { $rand: {} }] }
        });
    }



    async getRandomTrackExcludeAndInclude(include, exclude) {
        let result = await this.tracks.findOne({
             $and: [
        {
            _id: {
                $in: include.map(id => {
                    return new ObjectId(id);
                })
            }
        },
        {
            _id:{
                $nin: exclude.map(id => {
                    return new ObjectId(id);
                })  
            }
        }
    ],
    $expr: { $lt: [0.5, {$rand: {} } ] }
    });
    if (result === null)
    {
       return this.getRandomTrackExcludeAndInclude(include, exclude);
    }
    else
    {
        return result;
    }
    }

    async MuserSearch(query) {
        const results = await this.tracks.aggregate([
            {
                $search: {
                  index: 'default',
                  text: {
                    query: query,
                    path: {
                      'wildcard': '*'
                    }
                  }
                }
            }
        ]).toArray();   
        const results2 = await this.tracks.find(
            {
                $or:[{name:{ $regex: query, $options: "i" }}, {author:{ $regex: query, $options: "i" }},]
            }
        ).toArray();   

        const sumresults = results.concat(results2);
        
        const authors = [];
        sumresults.map(track => {
            if (track.author.lenght === 1 && !authors.includes(track.author[0])) {
                authors.push(
                     track.author
                );
                return;


            }
            else
            {
            track.author.forEach(author => {
             if (!authors.includes(author))
            {
                authors.push(
                    author
               ); 
            }
            });
            }
            
        });
        return { tracks: sumresults, authors: authors };
    }

    async UploadTrack(){

    }

    async getAuthor(author){
        return await this.tracks.find({author:author}).toArray();
    }
}

module.exports = MongoModule;