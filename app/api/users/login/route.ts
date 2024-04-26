import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect()

export async function POST(request: NextRequest) {
    try {
        const req = await request.json();
        const { email, password } = req;
        console.log(req);
        //check if user exist
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User does not exist" },
                { status: 400 })
        }

        //check password
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid Password" },
                { status: 400 })
        }

        //create token data
        const tokenData = {
            id: user._id,
            userName: user.userName,
            email: user.email
        }

        //Create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1h" });
        const response = NextResponse.json({ message: "Login Successfull", success: true });
        response.cookies.set("token", token,
            { httpOnly: true });
        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message },
            { status: 500 })
    }
}