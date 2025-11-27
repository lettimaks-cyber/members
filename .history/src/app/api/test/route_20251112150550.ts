import { connectToDB } from "@/lib/db";
import TestModel from "@/models";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDB();

  const newDoc = await TestModel.create({ name: "Hello MongoDB" });
  return NextResponse.json({ message: "Connected & Saved", doc: newDoc });
}
