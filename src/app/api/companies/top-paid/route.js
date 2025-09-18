// src/app/api/companies/top-paid/route.js
import { NextResponse } from "next/server";
import { getDb } from "../../../../lib/mongodb.js";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    let limit = parseInt(searchParams.get("limit") || "5", 10);
    if (isNaN(limit) || limit <= 0) limit = 5;
    if (limit > 50) limit = 50;

    const db = await getDb();

    // Use aggregation to coerce salaryBand.base to a numeric value if possible,
    // filter out documents without a valid numeric base, sort and limit.
    // $convert / $toDouble style conversion requires MongoDB 4.x+. If your server
    // doesn't support it, fallback to a find() approach (handled in catch).
    const pipeline = [
      { $match: { "salaryBand.base": { $exists: true } } },
      {
        $addFields: {
          _numericBase: {
            $convert: {
              input: "$salaryBand.base",
              to: "double",
              onError: null,
              onNull: null,
            },
          },
        },
      },
      { $match: { _numericBase: { $ne: null } } },
      { $sort: { _numericBase: -1 } },
      { $limit: limit },
      { $project: { _numericBase: 0 } }, // remove helper field
    ];

    let companies = await db.collection("companies").aggregate(pipeline).toArray();

    // If aggregation returned nothing but collection likely has numeric values,
    // fallback to a safer find+sort (handles older Mongo versions).
    if (!companies || companies.length === 0) {
      companies = await db
        .collection("companies")
        .find({ "salaryBand.base": { $exists: true } })
        .sort({ "salaryBand.base": -1 })
        .limit(limit)
        .toArray();
    }

    return NextResponse.json(companies);
  } catch (err) {
    // If aggregation operators are unsupported, fall back to find() approach.
    try {
      const { searchParams } = new URL(req.url);
      let limit = parseInt(searchParams.get("limit") || "5", 10);
      if (isNaN(limit) || limit <= 0) limit = 5;
      if (limit > 50) limit = 50;

      const db = await getDb();
      const companies = await db
        .collection("companies")
        .find({ "salaryBand.base": { $exists: true } })
        .sort({ "salaryBand.base": -1 })
        .limit(limit)
        .toArray();

      return NextResponse.json(companies);
    } catch (err2) {
      console.error("top-paid route error:", err, err2);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  }
}
