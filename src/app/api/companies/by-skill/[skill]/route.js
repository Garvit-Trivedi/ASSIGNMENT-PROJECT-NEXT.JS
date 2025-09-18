import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function GET(req, { params }) {
  const db = await getDb();
  const companies = await db
    .collection("companies")
    .find({ "hiringCriteria.skills": { $regex: new RegExp(params.skill, "i") } })
    .toArray();

  return NextResponse.json(companies);
}
