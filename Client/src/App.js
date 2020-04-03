import React from 'react'
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom'

import Home from './components/static/home'
import Login from './components/users/login'
import Register from './components/users/register'
import Logout from './components/users/logout'


import CustomerList from './components/customers/Listing-customers'
import NewCustomer from './components/customers/New'
import CustomerShow from './components/customers/show'
import CustomerEdit from './components/customers/edit'

import DepartmentList from './components/departments/List'

import EmployeesList from './components/employees/employees-list'
import NewEmployee from './components/employees/employee-form'

import TicketsList from './components/tickets/ticket-list'
import TicketForm from './components/tickets/ticket-form'


function App(props){
    return (
        <BrowserRouter>
            <div>
                <h1>Ticket master</h1>
                <Link to='/'>Home</Link> {' '}
                {
                    localStorage.getItem('authKey') && (localStorage.getItem('authKey') !== ('invalid email/password' || 'invalid password'))? ( 
                    <div>
                        <Link to="/users/account">Account</Link> {' '}
                        <Link to='/customers'>Customers</Link> {' '}
                        <Link to='/departments'>Departments</Link> {' '}
                        <Link to='/employees'>Employees</Link> {' '}
                        <Link to='/tickets'>Tickets</Link> {' '}
                        <Link to="/users/logout">Logout</Link>  {' '}

                    </div> 
                        ) : (
                            <div>
                                <Link to="/users/login">Login</Link> {' '}
                                <Link to="/users/register">Register</Link>
                                {localStorage.clear()}
                            </div> 
                        ) 
                    }
                
                <Switch>
                    <Route path='/' component={Home} exact={true} /> 
                    <Route path='/users/login' component={Login}/> 
                    <Route path='/users/register' component={Register}/>
                    <Route path = '/users/logout' component = {Logout} />
                
                    <Route path='/customers' component = {CustomerList} exact={true}/>
                    <Route path='/customers/new' component = {NewCustomer} />
                    <Route path='/customers/edit/:id' component={CustomerEdit} exact={true}/>
                    <Route path= '/customers/:id' component = {CustomerShow} exact={true}/> 

                    <Route path='/departments' component={DepartmentList} />

                    <Route path='/employees' component={EmployeesList} exact={true} />
                    <Route path='/employees/new' component={NewEmployee} />

                    <Route path='/tickets' component={TicketsList} exact={true}/>
                    <Route path='/tickets/new' component={TicketForm} />
                </Switch>
                
            </div>
        </BrowserRouter>
        
    )
}
export default App