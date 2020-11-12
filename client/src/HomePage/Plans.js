import { React, useState, useEffect } from 'react'
import Card from './Card.js'
import axios from 'axios'


export default function Plans() {

    useEffect(() => {
        fetchPlans();
    }, [])

    const [plans, setPlans] = useState([
    ])

    const fetchPlans = async () => {
        const result = await axios.get("plans");
        console.log(result);
        setPlans(result.data);
    };

    return (
        <div className="plan-section section" id="Plan">
            <h2 className="text-center">Pick your Package</h2>
            <p className="text-center">We've got a plan that's right for you</p>

            <div className='plan-container'>
                {plans.map(plan => (
                    <Card plan={plan} key={plan._id} />
                ))}
            </div>

        </div>
    )
}
