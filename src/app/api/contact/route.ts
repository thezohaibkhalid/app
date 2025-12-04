import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Contact from "@/models/Contact";

export async function POST(request: Request) {
    await dbConnect();

    try {
        const body = await request.json();
        const contact = await Contact.create(body);
        return NextResponse.json({ success: true, data: contact }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: "Failed to send message" }, { status: 400 });
    }
}
