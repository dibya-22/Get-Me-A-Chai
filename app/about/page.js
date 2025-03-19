import React from 'react'

const About = () => {
    return (
        <>
            <div className='container w-[69%] mx-auto space-y-11'>
                <div>
                    <h1 className='text-2xl md:text-3xl font-bold flex items-center gap-1'>About Get Me A Chai <img width={60} src="/icons/tea-cup.gif" alt="☕" /></h1>
                    <p className='text-sm md:text-lg font-light my-3'>
                        Welcome to Get Me a Chai, a platform that empowers creators to connect with their supporters and turn their passion into sustainable income. Whether you're an artist, writer, developer, or content creator, we provide you with a space where your fans can support you with small contributions—just like buying you a chai!
                    </p>
                </div>

                <div>
                    <h2 className='text-xl md:text-2xl font-bold'>Why "Chai"?</h2>
                    <p className='text-sm md:text-lg font-light my-3'>
                        Chai is more than just a drink; it's a symbol of warmth, connection, and creativity. We believe supporting creators should feel as easy and meaningful as sharing a cup of chai with a friend.!
                    </p>
                </div>
                
                <div>
                    <h2 className='text-xl md:text-2xl font-bold'>Our Mission</h2>
                    <p className='text-sm md:text-lg font-light my-3'>
                    We built <span className='font-semibold'>Get Me a Chai</span> to offer an alternative to traditional crowdfunding. No complicated setups, no overwhelming features—just a simple way for your audience to show appreciation for your work while helping you grow.
                    </p>
                </div>

                <div>
                    <h2 className='text-xl md:text-2xl font-bold'>How It Works</h2>
                    <li className='text-sm md:text-lg font-light mx-3 mt-3'><span className='font-semibold'>Create Your Page</span> – Set up your profile in minutes.</li>
                    <li className='text-sm md:text-lg font-light mx-3 my-1'><span className='font-semibold'>Receive Support</span> – Fans can contribute one-time or recurring payments.</li>
                    <li className='text-sm md:text-lg font-light mx-3'><span className='font-semibold'>Engage & Grow</span> – Build your community and give exclusive perks to supporters.</li>
                </div>

                <div>
                    <h2 className='text-xl md:text-2xl font-bold'>Join the Chai Revolution</h2>
                    <p className='text-sm md:text-lg font-light my-3'>
                    Whether you're a creator looking for support or a fan wanting to give back, <span className='font-semibold'>Get Me a Chai</span> is here to make the experience simple, fun, and rewarding.
                    </p>
                </div>
            </div>
        </>
    )
}

export default About


export const metadata = {
    title: "About - Get Me A Chai",
}