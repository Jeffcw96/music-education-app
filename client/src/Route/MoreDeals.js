import React from 'react'
import Deals from './Deals'

export default function MoreDeals({ deals , updatePlan}) {
    return (
        <div className="more-deal-container">
            <div className="wrap">
                <div className="more-deal-desp">
                    <h2>Take More. Pay Less!</h2>
                    <p>One-time payment. Top up when you want. Does not auto-renew.</p>
                </div>
                {deals.map(deal => (                    
                    <Deals duration={deal.duration} price={deal.price} key={deal._id} plan={deal} updatePlan={updatePlan}/>                    
                ))}
            </div>
        </div>
    )
}
