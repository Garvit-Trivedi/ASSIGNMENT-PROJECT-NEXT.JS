import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function GET(req, { params }) {
  const db = await getDb();
  const companies = await db
    .collection("companies")
    .find({ location: { $regex: new RegExp(params.location, "i") } })
    .toArray();

  return NextResponse.json(companies);
}
