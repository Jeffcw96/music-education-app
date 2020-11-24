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

    async function planDetails() {
        try {
            if (id !== "free") {
                const response = await axios.get(`http://localhost:5000/plans/package?q=${id}`);
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



    return (
        <div>
            <Nav />
            <SelectedPlan plan={id} detail={originalPlan} />
            <MoreDeals deals={detail} />
            <Paypal />
        </div>
    )
}
