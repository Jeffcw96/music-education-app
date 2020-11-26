import React from 'react'

export default function Deals({ duration, price, plan, updatePlan }) {
    return (
        <div onClick={() => updatePlan(plan)}>
            <div className='upgrade-plan-wrap'>
                <h3>{duration} months</h3>
                <p>One-time payment of RM{price}</p>
            </div>
        </div>
    )
}
