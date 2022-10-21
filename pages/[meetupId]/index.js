import MeetupDetails from "./../../components/meetups/MeetupDetails";
import { MongoClient, ObjectId } from "mongodb";
import  Head  from 'next/head';
import { Fragment } from "react";
const MeetupDetail = (props) => {
  //useRouter;
  return (
    <Fragment>
         {/* for best user experience : the head element gives you description , title of site  */}
      <Head>
        {/* titre de l'onglet ouverte en haut */}
        <title>{props.meetupData.title}</title>
        {/* the description shown when searching on google */}
        <meta
          name="description"
          content={props.meetupData.description}
        />
      </Head>

      <MeetupDetails
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
};

//if we're using dynamic page + getStaticProps WE NEED OTHER FCT getStaticPaths
// allows you to control which pages are generated during the build
export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://wass2guez:<password>@cluster0.iwazgwo.mongodb.net/<collection_name>?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollection = db.collection("nextjsdb");
  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();
  client.close();

  //in our example we have m1 , m2 , m3 ids for every meetup
  return {
    //fallback tells next whether your paths array contains all supported params
    //if false contains all params
    //if true :  some of params and it will generate id dynamically on server
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
};
//in getStaticProps CONTEXT have access to params
export const getStaticProps = async (context) => {
  //[meetupId] could be accessed with context.params.
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect(
     "mongodb+srv://wass2guez:<password>@cluster0.iwazgwo.mongodb.net/<collection_name>?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollection = db.collection("nextjsdb");

  const selectedMeetup = await meetupCollection.findOne({
    _id: ObjectId(meetupId),
  });
  console.log(meetupId);
  //fetch data for single meetup
  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    },
  };
};
export default MeetupDetail;
