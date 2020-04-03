import React from 'react'
import {Link} from 'react-router-dom'
import axios from '../../config/axios'
import Chart from "react-google-charts"

class TicketsList extends React.Component {
    constructor() {
        super()
        this.state = {
            tickets: [],
            employees: []
        }
    }

    componentDidMount() {
        axios.get('/tickets', {
            headers : {
                "x-auth": localStorage.getItem('authKey')
            }
        })
        .then((response) => {
            const tickets = response.data
            this.setState({tickets})
            //console.log(tickets)
        })
        .catch((err) => {
            console.log(err)
        })

    }

    handleRemove = (id) => {
        axios.delete(`/tickets/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('authKey')
            }
        })
        .then((response) => {
            const ticket = response.data
            this.setState((prevState) => ({
                tickets: prevState.tickets.filter(tkt => tkt._id !== ticket._id ) 
            }))
        })
        .catch((err) => {
            alert(err)
        })
    }
    
    render() {
        const tickets = this.state.tickets.map(ticket=>{
                return Object.assign({},ticket, {department: ticket.department.name} , {customer: ticket.customer.name}, 
                    {employees: ticket.employees.map(employee => {
                        return employee.name
                    })})
        })

        const priorityTickets = this.state.tickets
        const highPriority = priorityTickets.filter(ticket => ticket.priority === 'High').length
        const lowPriority = priorityTickets.filter(ticket => ticket.priority === 'Low').length
        const mediumPriority = priorityTickets.filter(ticket => ticket.priority === 'Medium').length
        return (
            <div className = 'row'>
                {console.log(tickets)}
                <div className = 'col-md-1'></div>
                <div className = 'col-md-10'>
                <h1>Tickets - {tickets.length}</h1>
                {
                    this.state.tickets.length === 0 ? (
                        <div className = 'spinner-border'></div>
                    ) : (
                        <div>
                             <table className =" table border border-primary ">
                                <thead className="thead-dark">
                                    <tr>
                                        <th>Code No</th>
                                        <th>Customer</th>
                                        <th>Department</th>
                                        <th>Employees</th>
                                        <th>Message</th>
                                        <th>Priority</th>
                                        <th>Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        tickets.map(ticket => {
                                            return (
                                            <tr key ={ticket._id}>

                                                <td>{ticket.code}</td>
                                                <td>{ticket.customer}</td>
                                                <td>{ticket.department}</td>
                                                <td>{ticket.employees}</td>
                                                <td>{ticket.message}</td>
                                                <td>{ticket.priority}</td>
                                                <td><button className = "btn btn-danger" onClick = {() => {
                                                    this.handleRemove(ticket._id)
                                                }}>Remove</button></td>
                                            </tr>)
                                        } )
                                    }
                                </tbody>
                            </table> <br/>
                            <Link to='/tickets/new'>Add ticket</Link>    
                            <hr/>
                                    
                            <Chart
                                width={'500px'}
                                height={'300px'}
                                chartType="Bar"
                                loader={<div>Loading Chart</div>}
                                data={[
                                    ['Priority' ,'Tickets'],
                                    [lowPriority ,'Low'],
                                    [ mediumPriority, 'Medium'],
                                    [ highPriority ,'High']
                                ]}
                                options={{
                                    // Material design options
                                    chart: {
                                    title: 'Tickets Priority'
                                    },
                                }}
                                // For tests
                                rootProps={{ 'data-testid': '2' }}
                            />
                        </div>
                    )
                }

                </div>
            </div>
        )
    }
}

export default TicketsList