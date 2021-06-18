import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import useSWR from 'swr'

// import { getFilteredEvents } from 'dummy-data'
// import { getFilteredEvents } from 'helpers/api-util'
import EventList from 'components/events/event-list'
import Button from 'components/ui/button'
import ResultsTitle from 'components/events/results-title'
import ErrorAlert from 'components/ui/error-alert'

const FilteredEventsPage = () => {
  const [loadedEvents, setLoadedEvents] = useState()
  const router = useRouter()

  const filterData = router.query.slug // ['2021','1']

  const { data, error } = useSWR(process.env.NEXT_PUBLIC_FIREBASE_DB)

  useEffect(() => {
    if (data){
      const events = []

      for(const key in data){
        events.push({
          id: key,
          ...data[key]
        })
      }

      setLoadedEvents(events)
    }
  }, [data])

  if (!loadedEvents) {
    return <p className='center'>Loading....</p>
  }

  const numYear = +filterData[0]
  const numMonth = +filterData[1]

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 || 
    error
  ) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </>
    )
  }

  const filteredEvents = loadedEvents.filter(event => {
    const eventDate = new Date(event.date)

    return (
      eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1
    )
  })
  
  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </>
    )
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  )
}

export default FilteredEventsPage
