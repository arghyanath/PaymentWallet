import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import bcrypt from "bcrypt"

async function main() {
    const alice = await prisma.user.upsert({
        where: { number: '9999999999' },
        update: {
            password: await bcrypt.hash('alice', 10),
            balance: {
                create: {
                    amount: 20000,
                    locked: 0
                }
            },
        },
        create: {
            number: '9999999999',
            password: await bcrypt.hash('alice', 10),
            name: 'alice',
            onRampTransaction: {
                create: {
                    startTime: new Date(),
                    status: "Success",
                    amount: 20000,
                    token: "122",
                    provider: "HDFC Bank",
                },
            },

        },
    })
    const bob = await prisma.user.upsert({
        where: { number: '9999999998' },
        update: {
            password: await bcrypt.hash('bob', 10),
            balance: {
                create: {
                    amount: 2000,
                    locked: 0
                }
            },

        },
        create: {
            number: '9999999998',
            password: await bcrypt.hash('bob', 10),
            name: 'bob',
            onRampTransaction: {
                create: {
                    startTime: new Date(),
                    status: "Failure",
                    amount: 2000,
                    token: "123",
                    provider: "HDFC Bank",
                },
            },

        },
    })
    console.log({ alice, bob })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })