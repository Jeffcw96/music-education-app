import React from 'react'

export default function Deals({ duration, price }) {
    return (
        <div className='upgrade-plan-wrap'>
            <h3>{duration} months</h3>
            <p>One-time payment of RM{price}</p>
        </div>
    )
}
