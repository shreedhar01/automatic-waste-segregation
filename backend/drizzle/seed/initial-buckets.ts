import { db } from "../../src/db";
import { bucketTable } from "../../src/db/schema";

async function seed() {
    console.log("Seeding database...");

    await db.insert(bucketTable).values([
        { name: "Organic", length: 12 },
        { name: "Plastic", length: 12 },
        { name: "Metal", length: 12 },
        { name: "Paper", length: 12 },
        { name: "Glass", length: 12 }
    ]);

    console.log("Database seeded successfully!");
}

seed()
    .catch((error) => {
        console.error("Error seeding database:", error);
        process.exit(1);
    })
    .finally(() => {
        process.exit(0);
    });