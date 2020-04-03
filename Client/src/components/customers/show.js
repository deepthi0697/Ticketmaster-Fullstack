import React from 'react'
import axios from '../../config/axios'
import isEmpty from 'lodash/isEmpty'
import {Link} from 'react-router-dom'

class CustomerShow extends React.Component {
    constructor(){
        super()
        this.state = {
            customer: {}
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`/customers/${id}`, {
            headers : {
                'x-auth' : localStorage.getItem('authKey')
            }
        })
        .then((response) => {
            console.log(response.data)
            const customer = response.data
            this.setState({customer})
        })
        .catch((err) => {
            alert(err)
        })

    }
    render() {
        return (
            <div>
                <h2 className="font-weight-bold text-monospace">Customer show</h2>
                {
                    isEmpty(this.state.customer) ? (
                        <div class="spinner-grow" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    ) : (
                        <div>
                            <p className="font-italic">{this.state.customer.name} - {this.state.customer.email} - {this.state.customer.mobile}</p>
                        </div>

                    )
                }  
                <Link to={`/customers/edit/${this.state.customer._id}`}>Edit</Link>   

            </div>
        )
    }
}

export default CustomerShow