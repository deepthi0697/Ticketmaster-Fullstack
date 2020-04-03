import React from 'react'
import ticketmaster from './ticketmaster.jpg'

function Home(props){
    return (
        <div className = 'row'>
            <div className = 'col-md-3'></div>
            <div className = 'col-md-5'>
                <h1>Welcome to Ticketmaster</h1>
                <img style={{width: '700px', height: '450px'}} src={ticketmaster} class="rounded mx-auto d-block" alt="..."/>
            </div>
        </div>
    )
}

export default Home