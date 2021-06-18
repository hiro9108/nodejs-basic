import { getFeaturedEvents } from 'helpers/api-util'
import EventList from 'components/events/event-list'

export default function Home({featuredEvents}) {
  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  )
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents()
  
  return{
    props: {
      featuredEvents: featuredEvents
    },
    revalidate: 60
  }
}