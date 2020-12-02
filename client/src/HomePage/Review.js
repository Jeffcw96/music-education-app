import { React } from 'react'
import { Pie } from 'react-chartjs-2';

export default function Review() {

    const chartGap = {
        margin: '7vh 0',
        position: 'relative',
        maxHeight: '700px'
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
        <div style={chartGap}>
            <Pie height={700} data={state}
                options={{
                    cutoutPercentage: 90,
                    maintainAspectRatio: false,
                    animation: {
                        duration: 2000,
                        onComplete: function (e) {
                            console.log("chart loaded");
                        }
                    },
                    tooltips: {
                        enabled: false
                    },
                    legend: {
                        display: false
                    },
                }} />
            <div className='tr'></div>
        </div>
    )
}
