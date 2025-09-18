// // lib/mongodb.js
// import { MongoClient } from "mongodb";

// const uri = "mongodb+srv://assignment:assignment@assignment.jtoji2z.mongodb.net/"; // 🔹 replace with your MongoDB URI
// const dbName = "workbook"; // 🔹 replace with your DB name

// let client;
// let clientPromise;

// if (!global._mongoClientPromise) {
//   client = new MongoClient(uri);
//   global._mongoClientPromise = client.connect();
// }

// clientPromise = global._mongoClientPromise;

// export async function getDb() {
//   const client = await clientPromise;
//   return client.db(dbName);
// }


// src/lib/mongodb.js
// import { MongoClient } from "mongodb";

// const uri = "mongodb+srv://assignment:assignment@assignment.jtoji2z.mongodb.net/"; // change DB name if needed

// let client;
// let clientPromise;

// if (!global._mongoClientPromise) {
//   client = new MongoClient(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
//   global._mongoClientPromise = client.connect();
// }

// clientPromise = global._mongoClientPromise;

// export async function getDb() {
//   const client = await clientPromise;
//   return client.db(); // default db (nextjsdb)
// }


// src/lib/mongodb.js
import { MongoClient } from "mongodb";

const uri = "mongodb+srv://assignment:assignment@assignment.jtoji2z.mongodb.net/"; // update DB name if needed

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri); // ✅ no extra options needed in v4+
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export async function getDb() {
  const client = await clientPromise;
  return client.db();
}
