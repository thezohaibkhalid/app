import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { username, password } = await request.json();

        // Check if user exists
        const user = await User.findOne({ username });

        // If no user exists, create one (ONLY FOR FIRST TIME SETUP/DEMO)
        // In production, you'd seed this or have a registration flow disabled
        if (!user) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = await User.create({ username, password: hashedPassword });

            // Create token
            const token = jwt.sign({ userId: newUser._id, username: newUser.username }, JWT_SECRET, {
                expiresIn: "1d",
            });

            const cookie = serialize("auth_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60 * 24, // 1 day
                path: "/",
            });

            return NextResponse.json({ success: true }, { headers: { "Set-Cookie": cookie } });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // Create token
        const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, {
            expiresIn: "1d",
        });

        const cookie = serialize("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24, // 1 day
            path: "/",
        });

        return NextResponse.json({ success: true }, { headers: { "Set-Cookie": cookie } });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
