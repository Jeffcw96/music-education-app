import { React, useRef, useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2';

export default function Review() {
    let [visible, setVisible] = useState(false);
    const ref = useRef();
    const chartLabel = useRef();
    const onScreen = useOnScreen(ref, '-450px');

    // Hook
    function useOnScreen(ref, rootMargin = '0px') {
        // State and setter for storing whether element is visible
        const [isIntersecting, setIntersecting] = useState(false);

        useEffect(() => {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    // Update our state when observer callback fires
                    setIntersecting(entry.isIntersecting);
                    if (entry.isIntersecting && !visible) {
                        setVisible(true);
                    }

                },
                {
                    rootMargin
                }
            );
            if (ref.current) {
                observer.observe(ref.current);
            }

            return () => {
                observer.unobserve(ref.current);
            };


        }, []); // Empty array ensures that effect is only run on mount and unmount



        return isIntersecting;
    }

    const state = {
        labels: ['Music Competition', 'Music Challenge', '1 On 1 Mentor', 'Music Editor', 'Music Sheet & Chord', 'Instructment'],
        datasets: [{
            data: [1, 1, 1, 1, 1, 1],
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1
        }]
    }



    return (
        <div className='feature-section' id='feature' ref={ref}>
            <div>
                {visible ?
                    <Pie data={state} width={1000} height={400}
                        options={{
                            cutoutPercentage: 90,
                            responsive: true,
                            animation: {
                                duration: 2000,
                                onComplete: function (e) {
                                    chartLabel.current.classList.add('active');
                                }
                            },
                            tooltips: {
                                enabled: false
                            },
                            legend: {
                                display: false
                            },
                        }} />
                    : null
                }
            </div>
            <div className="chart-label-container">
                <div className="chart-label-wrap" ref={chartLabel}>
                    <div className="tr">
                        <div className="des-wrap">
                            {/* <div className='tr-joint'></div> */}
                            <div className="tr-des">
                                <h3>Music Competition</h3>
                                <p>improve your skills by participating the Competition with others</p>
                            </div>
                        </div>
                    </div>
                    <div className='mr'>
                        <div className="des-wrap">
                            {/* <div className='mr-joint'></div> */}
                            <div className="mr-des">
                                <h3>Music Challenge</h3>
                                <p>Challenge and test yourself after experienced our service</p>
                            </div>
                        </div>
                    </div>
                    <div className='br'>
                        <div className="des-wrap">
                            {/* <div className='br-joint'></div> */}
                            <div className="br-des">
                                <h3>1 On 1 Mentor</h3>
                                <p>Book and Ask for Professional advice from our Partner</p>
                            </div>
                        </div>
                    </div>
                    <div className='tl'>
                        <div className="des-wrap">
                            {/* <div className='tl-joint'></div> */}
                            <div className="tl-des">
                                <h3>Music Editor</h3>
                                <p>Record and edit your stunning music together</p>
                            </div>
                        </div>
                    </div>
                    <div className='ml'>
                        <div className="des-wrap">
                            {/* <div className='ml-joint'></div> */}
                            <div className="ml-des">
                                <h3>Instructment</h3>
                                <p>We've cover more than 50 instructment</p>
                            </div>
                        </div>
                    </div>
                    <div className='bl'>
                        <div className="des-wrap">
                            {/* <div className='bl-joint'></div> */}
                            <div className="bl-des">
                                <h3>Music Sheet & Chord</h3>
                                <p>Enjoy the latest pop song and classic music Sheet</p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}
