import {Client,Databases,ID,Query} from 'appwrite'

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID

const client = new Client().setEndpoint('https://syd.cloud.appwrite.io/v1').setProject(PROJECT_ID);

const database = new Databases(client);

const updatesearchcount = async (searchterm,movie) => {
    try{
        //1.Search the movies existence inside the database.
        const result = await database.listDocuments(DATABASE_ID,COLLECTION_ID,[Query.equal('searchterm',searchterm)]);

        //2.If exists increment its count by 1.
        if(result.total>0){
            const doc = result.documents[0];

            await database.updateDocument(DATABASE_ID,COLLECTION_ID,doc.$id,{count:doc.count+1});
        }

        //3.If not create a row/tuple for it and increment set its count as 1.
        else{
            await database.createDocument(DATABASE_ID,COLLECTION_ID,ID.unique(),{
                searchterm,
                count:1,
                poster_url:`https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                movie_id:movie.id
            })
        }
    }
    catch(error){
        console.error(error);
    }
}

const gettrendingmovies = async () => {
    try{
        const result = await database.listDocuments(DATABASE_ID,COLLECTION_ID,[
            Query.limit(5),
            Query.orderDesc("count")
        ])
        return result.documents;
    }
    catch(error){
        console.error(error);
    }
}

export {updatesearchcount,gettrendingmovies};