import NewMeetupForm from "./../../components/meetups/NewMeetupForm";
import { useRouter } from 'next/router';
import Head from "next/head";
import { Fragment } from "react";
const newMeetupPage = () => {
    const router = useRouter()
    const addMeetupHandler = async (enteredMeetupData) => {
      const response = await fetch('/api/new-meetup' , {
        method : 'POST',
        body: JSON.stringify(enteredMeetupData),
        headers : {
            'Content-Type' : 'application/json'
        }
      })
      const data = await response.json()
      console.log(data)
      //to return to home page after adding new meetup
      router.push('/')
    }
  return (
    <Fragment>
         {/* for best user experience : the head element gives you description , title of site  */}
      <Head>
        {/* titre de l'onglet ouverte en haut */}
        <title>Add new MeetUP</title>
        {/* the description shown when searching on google */}
        <meta
          name="description"
          content="Add your own meetups"
        />
      </Head>

        <NewMeetupForm  onAddMeetup={addMeetupHandler} />
    </Fragment>

  )
    
};
export default newMeetupPage;
