import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { bucketTable } from "../db/schema.js";
import { Buckets } from "../types/bucket-name.js";

export const postLengthService = async (name: Buckets, length: number) => {
    // const value = Buckets[name];
    console.log(`name :: ${name} number :: ${length}`)
    await db.update(bucketTable).set({ length: length }).where(eq(bucketTable.name, name))
    return true
}