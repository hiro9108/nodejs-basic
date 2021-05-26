import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import * as actions from '../actions'

import Header from './Header'
import PrivateRoute from './PrivateRoute';

const Landing = () => (<h1>Landing Page</h1>)
const Dashboard = () => (<h1>Dashboard Page</h1>)

const App = ({ fetchUser }) => {

    useEffect(() => {
        fetchUser()
    }, [fetchUser])

  return (
    <div>
        <Header />
        <Switch>
            <Route path="/" exact component={Landing} />
            <PrivateRoute path="/surveys" exact component={Dashboard} />
        </Switch>
    </div>)
}

export default connect(null, actions)(App)
