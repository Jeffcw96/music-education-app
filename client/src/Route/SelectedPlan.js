import { React, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Paypal from './Paypal.js'
export default function SelectedPlan({ plan, detail, duration }) {
    return (
        <div className="individual-plan-container">
            <div className="wrap">
                <h2>{plan} {duration === 1 ? "Individual" : duration + " Months"}</h2>
                <p style={{ display: plan === "free" ? 'none' : 'block' }} >From RM{detail.price}/ month</p>
                <small>Terms and conditions apply. Open only to users who haven’t already tried Premium.</small>
                <div className="paypal-button-container">
                    <Paypal color="black" shape="rect" plan={plan} duration={duration} />
                </div>
                <div className="individual-plan-action">
                    <div>You chose</div>
                    <div>
                        <Link to="/#Plan">
                            Change Plan
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
