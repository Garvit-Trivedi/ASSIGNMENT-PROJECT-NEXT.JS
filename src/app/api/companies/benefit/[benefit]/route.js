// app/api/companies/benefit/[benefit]/route.js
import { NextResponse } from "next/server";
import { getDb } from "../../../../../lib/mongodb.js";

export async function GET(req, context) {
  const { params } = await context; // ✅ await params
  const db = await getDb();

  const companies = await db
    .collection("companies")
    .find({
      benefits: { $regex: new RegExp(params.benefit, "i") }, // case-insensitive match
    })
    .toArray();

  return NextResponse.json(companies);
}
