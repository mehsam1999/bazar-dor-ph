
import dns from "node:dns"
import "dotenv/config"
import { MongoClient } from "mongodb"

dns.setServers(["9.9.9.9", "149.112.112.112"])

async function testConnection() {
  const client = new MongoClient(process.env.MONGODB_URL)

  try {
    await client.connect()
    await client.db("bazar-dor-ph").command({ ping: 1 })
    console.log("MongoDB connection successful")
  } catch (error) {
    console.error("MongoDB connection failed:", error)
  } finally {
    await client.close()
  }
}

testConnection()
