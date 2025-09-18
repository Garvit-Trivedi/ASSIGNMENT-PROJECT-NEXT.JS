// app/api/companies/route.js
import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function GET() {
  const db = await getDb();
  const companies = await db.collection("companies").find({}).toArray();
  return NextResponse.json(companies);
}
