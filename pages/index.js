import MeetupList from "./../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

const HomePage = (props) => {
  return (
    <Fragment>
      {/* for best user experience : the head element gives you description , title of site  */}
      <Head>
        {/* titre de l'onglet ouverte en haut */}
        <title>React Meetup</title>
        {/* the description shown when searching on google */}
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};
// cette fonction sera éxecuté avant toute fct
//prepare les propos pour cette page
//load data before this component executes
//good for search engines
// this fct runs during the process building
export const getStaticProps = async () => {
  //fetch data from API
  //here the db connection and all credentials will not be exposed to clientside
  const client = await MongoClient.connect(
    "mongodb+srv://wass2guez:<password>@cluster0.iwazgwo.mongodb.net/<collection_name>?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollection = db.collection("nextjsdb");
  const meetups = await meetupCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString(),
      })),
    },
    //regenerate this page every 10 seconds
    // to make page updated if some changes happens
    revalidate: 10,
  };
};

/******************************** alternative fct*/

//this fct runs on the server ( good for credentials infos)
//runs for every incoming request
//uses : when needs access to req ( for auth) + when we have multuple changes in every second
// export const getServerSideProps = async (context) => {
//     //with context parameter you can have access to req , res in backend(nodeJs)
//     //useful for authentication to check and valdiate
//     const req = context.req;
//     const res = context.res;
//   return ({
//     props : {
//         meetups : DUMMY_MEETUPS
//     }
//   })
// }

export default HomePage;
