import React from 'react'
import { Link } from 'react-router-dom'

export default function SelectedPlan({ plan, detail }) {
    console.log("detail", detail);
    return (
        <div className="individual-plan-container">
            <div className="wrap">
                <h2>{plan} Individual</h2>
                <p style={{ display: plan === "free" ? 'none' : 'block' }} >From RM{detail.price}/ month</p>
                <small>Terms and conditions apply. Open only to users who haven’t already tried Premium.</small>
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
