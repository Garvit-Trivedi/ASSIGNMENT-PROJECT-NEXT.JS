// app/api/companies/benefits/route.js
import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const benefit = searchParams.get("benefit");

  if (!benefit) {
    return NextResponse.json({ error: "Benefit is required" }, { status: 400 });
  }

  const db = await getDb();
  const companies = await db
    .collection("companies")
    .find({ benefits: { $regex: new RegExp(benefit, "i") } })
    .toArray();

  return NextResponse.json(companies);
}
