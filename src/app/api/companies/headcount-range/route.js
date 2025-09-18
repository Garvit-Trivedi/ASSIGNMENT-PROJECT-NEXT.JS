// app/api/companies/headcount-range/route.js
import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const min = parseInt(searchParams.get("min") || "0");
  const max = searchParams.get("max") ? parseInt(searchParams.get("max")) : null;

  if (isNaN(min) || (max !== null && isNaN(max))) {
    return NextResponse.json({ error: "Invalid range" }, { status: 400 });
  }

  const filter = { headcount: { $gte: min } };
  if (max !== null) filter.headcount.$lte = max;

  const db = await getDb();
  const companies = await db.collection("companies").find(filter).toArray();

  return NextResponse.json(companies);
}
