import React from 'react'

export default function Card({ plan }) {
    const feature = {
        paddingLeft: '15px',
        marginTop: '15px'
    }

    return (
        <div className='plan-card'>
            <h3 className='text-center package-title'>{plan.package} <span>{plan.price === 0 ? "" : "$" + plan.price}</span></h3>
            <hr></hr>
            <ul style={feature}>
                {plan.features.map(feature => (
                    <li className="plan-feature">{feature}</li>
                ))}
            </ul>
        </div>
    )
}
