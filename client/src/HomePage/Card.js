import React from 'react'
import { Link } from 'react-router-dom'


export default function Card({ plan }) {
    const feature = {
        paddingLeft: '15px',
        marginTop: '15px'
    }

    const anchor = {
        textDecoration: 'none'
    }

    const smallFont = {
        fontSize: '1rem'
    }

    const marginTop = {
        marginTop: '40px'
    }

    const renderAuthButton = () => {
        if (plan.price !== 0) {
            if (plan.package === 'premium') {
                console.log("premium")
                return <p className="price" style={marginTop}><span style={smallFont}>$</span>{plan.price}<span style={smallFont}> /month</span></p>
            } else {
                return <p className="price"><span style={smallFont}>$</span>{plan.price}<span style={smallFont}> /month</span></p>
            }
        }
    }

    const TNC = 'Terms and conditions apply.'
    return (
        <div className='plan-card'>
            <div>
                <div>
                    <h3 className='text-center package-title'>{plan.package}</h3>
                    <hr></hr>
                    <ul style={feature}>
                        {plan.features.map(feature => (
                            <div className='plan-feature-tick'>
                                <div className='tick'>✓</div>
                                <li className="plan-feature">{feature}</li>
                            </div>

                        ))}
                    </ul>
                </div>
                {renderAuthButton()}
            </div>

            <Link to={`/plan/${plan.package}`} style={anchor}>
                <div className="get-started">GET STARTED</div>
            </Link>

        </div>
    )
}
