// app/api/companies/by-location/route.js
import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const location = searchParams.get("location");

  if (!location) {
    return NextResponse.json({ error: "Location is required" }, { status: 400 });
  }

  const db = await getDb();
  const companies = await db
    .collection("companies")
    .find({ location: { $regex: new RegExp(location, "i") } })
    .toArray();

  return NextResponse.json(companies);
}
