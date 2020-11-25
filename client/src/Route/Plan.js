import { React, useState, useEffect } from 'react'
import Nav from '../Nav.js'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import SelectedPlan from './SelectedPlan.js';
import MoreDeals from './MoreDeals.js';
import Paypal from './Paypal.js';
export default function Plan() {
    const { id } = useParams();
    console.log("id", id)
    let [detail, setDetail] = useState([]);
    let [originalPlan, setOriginalPlan] = useState({});
    let [duration, setDuration] = useState(1)
    async function planDetails() {
        try {
            if (id !== "free") {
                const response = await axios.get(`/plans/package?q=${id}`);
                console.log("response", response)
                const result = response.data;
                let individualPlan = result.find(data => {
                    return data.duration === 1;
                })
                setOriginalPlan(individualPlan);
                setDetail(result);
            }
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        planDetails();
    }, [])

    function updatePlan(plan){
        setOriginalPlan(plan)
        if(plan.duration !== duration){
            setDuration(plan.duration);
        }
    }


    return (
        <div>
            <Nav />
            <SelectedPlan plan={id} detail={originalPlan} duration={duration}/>
            <MoreDeals deals={detail} updatePlan={updatePlan}/>

        </div>
    )
}
