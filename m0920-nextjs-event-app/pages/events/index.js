import { useRouter } from 'next/router'

// import { getAllEvents } from 'dummy-data'
import { getAllEvents } from 'helpers/api-util'
import EventList from 'components/events/event-list'
import EventSearch from 'components/events/event-search'

const AllEventsPage = ({events}) => {
    const router = useRouter()
    // const events = getAllEvents()

    const findEventsHandler = (year, month) => {
        const fullPath = `/events/${year}/${month}`
        router.push(fullPath)
    }

    return(
        <> 
            <EventSearch onSearch={findEventsHandler} />
            <EventList items={events} />
        </>
    )
}

export default AllEventsPage

export async function getStaticProps(){
    const events = await getAllEvents()

    return{
        props: {
            events: events
        },
        revalidate: 60
    }
}