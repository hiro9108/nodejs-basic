import Button from '../ui/button'
import DateIcon from '../icons/date-icon'
import AddressIcon from '../icons/address-icon'
import ArrowRightIcon from '../icons/arrow-right-icon'
import classes from './event-item.module.css'

const EventItem = (props) => {
    const {title, image, date, location, id } = props

    const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC'
      });
    const formattedAddress = location.replace(', ', '\n')

    return(
        <li className={classes.item}>
            <img src={'/' + image} alt={title} />
            <div className={classes.content}>
                <div className={classes.summary}>
                    <h2>{title}</h2>
                    <div className={classes.date}>
                        <DateIcon />
                        <time>{humanReadableDate}</time>
                    </div>
                    <div className={classes.address}>
                        <AddressIcon />
                        <address>
                            {formattedAddress}
                        </address>
                    </div>
                </div>
                <div className={classes.actions}>
                    <Button link={`/events/${id}`}>
                        <span>Explore Event</span>
                        <span className={classes.icon}>
                           <ArrowRightIcon />
                        </span>
                    </Button>
                </div>
            </div>
        </li>
    )
}

export default EventItem