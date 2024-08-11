const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  try {
    // Attempt to connect and perform a simple query
    const result = await prisma.artifact.findMany({
      take: 1
    })
    console.log('Database connection successful')
    console.log('Query result:', result)
  } catch (error) {
    console.error('Database connection failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()