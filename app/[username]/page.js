import React from 'react'
import PaymentPage from '../../components/PaymentPage'
import { notFound } from "next/navigation";
import connectDB from '@/db/connectDB';
import User from '@/models/User';

async function Username({params}) {
    const { username } = await params

    // If the username is not present in the database then show 404 page
    const checkUser = async ()=>{
        await connectDB();
        let u = await User.findOne({username: username})
        if(!u){
            return notFound();
        }
    }

    await checkUser();

    return (
        <>
            <PaymentPage username={username}/>
        </>
    )
}

export default Username

export async function generateMetadata ({ params }) {
    const { username } = await params;
    return {
        title: `${username} - Get Me A Chai`
    }
}