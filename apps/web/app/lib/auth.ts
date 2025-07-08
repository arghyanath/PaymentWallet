import CredentialsProvider from "next-auth/providers/credentials"
import db from "@repo/db/client"
import bcrypt from "bcrypt"
export const authOptions = {
    providers: [
        CredentialsProvider({

            name: "Credentials",

            credentials: {
                phone: { label: "Phone number", type: "text", placeholder: "1212212121", required: true },
                password: { label: "Password", type: "password", required: true }
            },
            async authorize(credentials: any) {

                const hashedPassword = await bcrypt.hash(credentials.password, 10)
                const existingUser = await db.user.findFirst({
                    where: {
                        number: credentials.phone
                    }
                })

                if (existingUser) {
                    const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                    if (passwordValidation) {
                        return {
                            id: existingUser.id.toString(),
                            name: existingUser.name,
                            number: existingUser.number
                        }
                    }
                    return null
                }

                try {
                    const user = await db.user.create({
                        data: {
                            number: credentials.phone,
                            password: hashedPassword
                        }
                    })

                    return {
                        id: user.id.toString(),
                        name: user.name,
                        number: user.number
                    }
                }
                catch (e) {
                    console.log(e)
                }

                return null


            }
        }),


    ],
    secret: process.env.NEXTAUTH_SECRET
}