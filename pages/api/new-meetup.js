//here we don't create react components
//define functions contains serverside code
//no exposing to users (uses credentials here)

import {MongoClient} from 'mongodb'

const handler = async (req ,res)=> {
    //only POST request  for this route
 if( req.method ==='POST'
) {
    const data = req.body;
    //connecting to DB
    const  client = await MongoClient.connect('mongodb+srv://wass2guez:wassboxeur2guez@cluster0.iwazgwo.mongodb.net/nextjsdb?retryWrites=true&w=majority')
    const db = client.db()

    const meetupsCollection = db.collection('nextjsdb')
    const result = await meetupsCollection.insertOne(data)
    console.log(result)
   //close db when its done
    client.close()
    res.status(201).json({ msg : 'MeetUp Inserted '})

}
}

export default handler