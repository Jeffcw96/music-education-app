import { React, useState, useEffect, useRef } from 'react'
import Nav from '../Nav.js'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import SelectedPlan from './SelectedPlan.js';
import MoreDeals from './MoreDeals.js';
import Footer from '../Footer.js';


export default function Plan() {
    const { id } = useParams();
    const paymentModal = useRef()
    let [detail, setDetail] = useState([]);
    let [originalPlan, setOriginalPlan] = useState({});
    let [duration, setDuration] = useState(1);
    let [payment, setPayment] = useState("");

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

    useEffect(() => {
        if (payment === 'success' || payment === 'failed') {
            paymentModal.current.classList.add('active');
            document.body.classList.add("modal-active");
        }

    }, [payment])


    function paymentMessage() {
        if (payment === "success") {
            return (
                <div className="success-payment-modal">
                    <h2>Payment Successful</h2>
                    <p>Thank you for trusting our server. We hope to serve you better</p>
                </div>
            )
        } else if (payment === "failed") {
            <div className="failed-payment-modal">
                <h2>Payment Failed</h2>
                <p>Kindly contact our customer service for further enquiry</p>
            </div>
        }
    }

    function closeModal() {
        paymentModal.current.classList.remove('active');
        document.body.classList.remove("modal-active");
    }

    function updatePlan(plan) {
        setOriginalPlan(plan)
        if (plan.duration !== duration) {
            setDuration(plan.duration);
        }
    }

    return (
        <div>
            <Nav />
            <SelectedPlan plan={id} detail={originalPlan} duration={duration} setPayment={setPayment} />
            <MoreDeals deals={detail} updatePlan={updatePlan} />
            <div class="modal" ref={paymentModal} id="paymentModal">
                <div class="modal-content">
                    <span class="close" onClick={closeModal}>&times;</span>
                    {paymentMessage()}
                </div>
            </div>
            <Footer />
        </div>
    )
}
