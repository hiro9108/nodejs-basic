import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const PrivateRoute = (props) => {
    return !!props.auth ? (
        <Route path={props.auth} exact={props.exact} component={props.component} />
    ): <Redirect to="/" />
}

export default PrivateRoute
