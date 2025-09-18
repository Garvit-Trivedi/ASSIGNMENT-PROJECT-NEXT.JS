// app/api/companies/by-skill/route.js
import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const skill = searchParams.get("skill");

  if (!skill) {
    return NextResponse.json({ error: "Skill is required" }, { status: 400 });
  }

  const db = await getDb();
  const companies = await db
    .collection("companies")
    .find({ "hiringCriteria.skills": { $regex: new RegExp(skill, "i") } })
    .toArray();

  return NextResponse.json(companies);
}
