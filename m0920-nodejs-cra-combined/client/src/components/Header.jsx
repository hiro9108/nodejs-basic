import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const Header = ({ auth }) => {
    const [userState, setUserState] = useState(null)

    useEffect(() => {
        setUserState(auth)
    }, [auth])

    return (
        <nav>
            <div className="nav-wrapper">
                <Link to={userState ? "/surveys" : "/"} className="left brand-logo">
                    Emeruly
                </Link>

                <ul className="right">
                    {userState ? (
                        <>
                            <li><a href="/api/auth/logout">Logout</a></li>
                        </>
                    ) : (
                        <li>
                            <a href="/api/auth/google">Login with Google</a>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    )
}

const mapStateToProps = ({ auth: { user }}) => {
    return { auth: user }
}

export default connect(mapStateToProps)(Header)
