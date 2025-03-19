"use client";

import React, { useState, useEffect } from "react";
import Script from "next/script";
import { fetchpayment, fetchuser, initiate, fetchprofilepayment } from "@/actions/useractions";
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';

const PaymentPage = ({username}) => {
    const { data: session } = useSession();

    const [paymentform, setpaymentform] = useState({name: "", message: "", amount: ""});
    const [currentUser, setcurrentUser] = useState({});
    const [payments, setPayments] = useState([]);
    const searchParams = useSearchParams();
    const router = useRouter();
    const [profilepayments, setProfilePayments] = useState([]);

    useEffect(() => {
        getData();
    }, []);
    
    useEffect(() => {
        if(searchParams.get("paymentdone") == "true"){
            toast.success('Payment Successful', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        router.push(`${username}`)
    }, [])
    

    const handleChange = (e) => {
        setpaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const getData = async () => {
        let u = await fetchuser(username);
        setcurrentUser(u);
        let dbpayments = await fetchpayment(username);
        setPayments(dbpayments);

        let p = await fetchprofilepayment(username);
        setProfilePayments(p);
    }

    const pay = async (amount) => {
        let a = await initiate(amount, username, paymentform);
        let orderId = a.id;
        var options = {
            "key": currentUser.razorpayid, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, amount refers to paise
            "currency": "INR",
            "name": "Get Me A Chai", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        }

        var rzp1 = new Razorpay(options);
        rzp1.open();
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            <div className='cover w-full relative p-0 m-0'>
                <img className='w-full md:h-[450px] object-cover' src={currentUser.coverpic} alt="cover-image" />
                <div className='absolute left-1/2 -bottom-10 transform -translate-x-1/2'>
                    <img width={120} height={120} className='object-cover rounded-full border-2 border-white transform scale-75 md:scale-100' src={currentUser.profilepic} alt="profile-image" />
                </div>
            </div>

            <div className="info flex flex-col items-center justify-center my-8 md:my-14 gap-2">
                <div className="username font-bold text-2xl md:text-4xl">
                    {username}
                </div>
                <p className='text-sm flex gap-1 items-center'>Lets help {username} to get a <img width={25} src="/icons/tea-cup.gif" alt="☕" className="invert"/></p>
                <ul className='flex gap-1'>
                    <li className='text-slate-400 text-sm font-semibold'>{profilepayments.length} Payments</li>
                    <li className='text-slate-400 text-sm font-semibold before:content-["•"] before:mr-1 before:text-slate-400'>₹{profilepayments.reduce((a, b)=> Number.parseInt(a) + Number.parseInt(b.amount), 0)} Raised</li>
                </ul>
                <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-10 py-2.5 me-2 mb-2">Become a member</button>
            </div>
            
            <div className="payment flex flex-col md:flex-row md:items-center justify-center gap-20 w-full md:w-[89%] mx-auto p-2 md:p-0">
                <div className="supporters min-h-96 bg-gray-900 md:w-1/2 rounded-lg p-5 md:p-10 text-sm md:text-lg">
                    <h2 className='font-bold text-xl md:text-3xl'>Top 10 Supporters</h2>
                    <ul className='flex flex-col items-start gap-3 my-4 md:ml-4'>
                        {payments.length == 0 && <li className="text-2xl font-bold opacity-50">No Payments Yet</li>}
                        {payments.map((p, i) => {
                            return <li key={i} className='flex gap-1'>
                                <img width={20} src="/icons/arrow.png" alt="arrow" className="transform md:scale-100 scale-75"/>
                                <span>{p.name} gifted <span className='font-bold'>₹{p.amount}</span></span>
                                <img width={25} src="/icons/rupee.gif" alt="coins" className="hidden md:block"/>. 
                                {p.message?.length > 0 && <span className="block mt-1 text-gray-300">"{p.message}"</span>}
                            </li>
                        })}
                    </ul>
                </div>
                <div className="makePayment min-h-96 bg-gray-900 md:w-1/2 rounded-lg p-10 ">
                    <h2 className='font-bold text-xl md:text-3xl'>Make a payment</h2>
                    <div className='flex flex-col gap-3 my-4 items-center'>
                        <input type="text" onChange={handleChange} value={paymentform.name} placeholder='Enter Name' name="name" className='w-[90%] bg-gray-500 hover:bg-gray-800 rounded-full px-10 py-2 focus:outline-none focus:ring-4 focus:ring-gray-300'/>
                        <input type="text" onChange={handleChange} value={paymentform.message} placeholder='Enter Message' name="message" className='w-[90%] bg-gray-500 hover:bg-gray-800 rounded-full px-10 py-2 focus:outline-none focus:ring-4 focus:ring-gray-300'/>
                        <input type="text" onChange={handleChange} value={paymentform.amount} placeholder='Enter Amount' name="amount" className='w-[90%] bg-gray-500 hover:bg-gray-800 rounded-full px-10 py-2 focus:outline-none focus:ring-4 focus:ring-gray-300'/>
                        <button onClick={()=> pay(Number.parseInt(paymentform.amount))} className="relative inline-flex items-center justify-center w-[60%] p-[2px] mb-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:bg-gradient-to-br disabled:from-slate-500 disabled:to-slate-400 dark:focus:ring-blue-800 transition-all " disabled={!paymentform.name || paymentform.name.length < 3 && !paymentform.amount || paymentform.amount < 10}>
                            <span className="w-full px-6 py-2.5 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-md transition-all duration-200 ease-in-out group-hover:bg-transparent group-hover:text-white">
                                Pay
                            </span>
                        </button>
                    </div>

                    <div className='flex gap-5 mx-3'>
                        <button className='bg-gray-500 hover:bg-gray-800 rounded-full p-3 hover:font-bold disabled:hidden' onClick={()=> pay(10)} disabled={!paymentform.name || paymentform.name.length < 3}>Pay ₹10</button>
                        <button className='bg-gray-500 hover:bg-gray-800 rounded-full p-3 hover:font-bold disabled:hidden' onClick={()=> pay(50)} disabled={!paymentform.name || paymentform.name.length < 3}>Pay ₹50</button>
                        <button className='bg-gray-500 hover:bg-gray-800 rounded-full p-3 hover:font-bold disabled:hidden' onClick={()=> pay(100)} disabled={!paymentform.name || paymentform.name.length < 3}>Pay ₹100</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaymentPage;
