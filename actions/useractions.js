"use server";

import Razorpay from "razorpay";
import Payment from '@/models/Payment';
import User from '@/models/User';
import connectDB from '@/db/connectDB';
import Username from "@/app/[username]/page";

export const initiate = async (amount, to_user, paymentform) => {
    await connectDB();
    let user = await User.findOne({username: to_user})
    const secret = user.razorpaysecret;
    const rid = user.razorpayid
    var instance = new Razorpay({key_id: rid, key_secret: secret})

    let options = {
        amount: Number.parseInt(amount) * 100,
        currency: "INR",
    }

    let x = await instance.orders.create(options);

    // Create a payment object which shows a pending payment in the DB
    await Payment.create({
        oid: x.id,
        amount: amount,
        to_user: to_user,
        name: paymentform.name,
        message: paymentform.message
    })

    return x;
}

export const fetchuser = async (username) => {
    await connectDB();
    let u = await User.findOne({username: username})
    let user = u.toObject({flattenObjectIds: true})
    return user;
}

export const fetchpayment = async (username) => {
    await connectDB();
    // Find all payments sorted by decreasing order of amount
    let p = await Payment.find({to_user: username, done: true}).sort({ amount: -1 }).limit(10).lean();
    return p?.map(payment=>({
        ...payment, _id: payment._id.toString(),
    })) || [];
}

export const fetchprofilepayment = async (username) => {
    await connectDB();
    // Find all payments sorted by decreasing order of amount
    let p = await Payment.find({to_user: username, done: true}).sort({ amount: -1 }).lean();
    return p?.map(payment=>({
        ...payment, _id: payment._id.toString(),
    })) || [];
}

export const updateProfile = async (data, oldusername) => {
    await connectDB();
    let ndata = Object.fromEntries(data);

    // If the username is being updated, check if username is available
    if(oldusername !== ndata.username){
        let u = await User.findOne({username: ndata.username});
        if(u){
            return {error: "Username already exists!"};
        }
        await User.updateOne({email: ndata.email}, ndata)

        // Now update all the usernames in the payment table of previous username
        await Payment.updateMany({to_user: oldusername}, {to_user: ndata.username})

    } else {
        await User.updateOne({email: ndata.email}, ndata)
    }
}