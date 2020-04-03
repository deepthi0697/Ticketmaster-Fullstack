import React from 'react'
import axios from '../../config/axios'
import {Link} from 'react-router-dom'

class CustomerList extends React.Component {
    constructor(){
        super()
        this.state={
            customers: []
        }
    }
    componentDidMount() {
        axios.get('/customers', {
            headers : {
                'x-auth' : localStorage.getItem('authKey')
            }
        })

        .then((response) => {
            const customers = response.data
            this.setState({customers})
        })
        .catch((err) => {
            alert(err)
        })
    }

    handleShow = (id) => {
        this.props.history.push(`/customers/${id}`)
    }

    handleRemove = (id) => {
        axios.delete(`/customers/${id}`, {
            headers:{
                'x-auth': localStorage.getItem('authKey')
            }
        })
        .then((response) => {
            const customer = response.data
            this.setState((prevState) => ({
                customers: prevState.customers.filter(cust => customer._id !== cust._id)
            }))
        })
    }
    render(){
        return (
            
            <div >
                
                {
                    (this.state.customers.length === 0) ? (
                        <div>
                            <div className='spinner-border'>
                                
                            </div>
                        </div>
                    ) : (
                        <div className = 'row'>
                            <div  className ='col-md-1'> </div>
                            <div className ='col-md-10'>
                            <h1>Listing Customers - {this.state.customers.length}</h1>
                                <table className =" table border border-primary ">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Mobile</th>
                                            <th>Actions</th>
                                            <th>Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.customers.map(customer => {
                                                return (
                                                    <tr key={customer._id}>
                                                        <td>{customer.name}</td>
                                                        <td>{customer.email}</td>
                                                        <td>{customer.mobile}</td>
                                                        <td><button onClick = {() => {
                                                            this.handleShow(customer._id)
                                                        }} className = "btn btn-primary">Show</button></td>
                                                        <td><button onClick = {() => {
                                                            this.handleRemove(customer._id)
                                                        }} className = "btn btn-danger">Remove</button></td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    
                                    </tbody>
                                </table>
                                <Link to='/customers/new' className=" btn btn-outline-primary">Add customer</Link>
                            </div>
                        </div>)
                }
                
            </div>
        )
    }
}

export default CustomerList