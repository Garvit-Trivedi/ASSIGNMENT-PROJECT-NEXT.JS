import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");
  const location = searchParams.get("location");
  const skill = searchParams.get("skill");

  const db = await getDb();
  const filter = {};
  if (name) filter.name = new RegExp(`^${name}$`, "i");
  if (location) filter.location = new RegExp(`^${location}$`, "i");
  if (skill) filter["hiringCriteria.skills"] = { $regex: new RegExp(skill, "i") };

  const total = await db.collection("companies").countDocuments(filter);
  return NextResponse.json({ total });
}
