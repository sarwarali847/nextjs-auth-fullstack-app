import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();
export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json();
        console.log(reqBody);
        const {email, username, password } = reqBody;
        //check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ error: "User already exists" },
                { status: 400 })
        }
        //Encrypt password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        //create user with hashed password
        const newUser = new User({
            email,
            username,
            password: hashedPassword
        })
        console.log(newUser);
        const savedUser = await newUser.save();
        console.log(savedUser);
        return NextResponse.json({ message: "User created successfully", success: true, savedUser });

    } catch (error: any) {
        return NextResponse.json({ error: error.message },
            { status: 500 })
    }
}
