import { React, useState, useEffect } from 'react'
import Card from './Card.js'

export default function Plans() {

    useEffect(() => {
        fetchPlans();
    }, [])

    const [plans, setPlans] = useState([{

    }])

    const fetchPlans = async () => {
        const data = await fetch("http://localhost:5000/plans")
        const plans = await data.json()
        console.log(plans);
        setPlans(plans)
    }

    return (
        <div className="plan-section section" id="Plan">
            <h2>Pick your Package</h2>
            <p>We've got a plan that's right for you</p>
            {
                plans.map(plan => {
                    <Card plan={plan} />
                })
            }

        </div>
    )
}
