import { Button } from "./button"

interface AppbarProps {
    user?: {
        name?: string | null
    },
    onSignin: any,
    onSignout: any
}

export function Appbar({ user, onSignin, onSignout }: AppbarProps) {
    return <div className="flex justify-between border-b px-4">
        <div className=" text-lg flex items-center">PaymentWallet</div>
        <div>
            <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
        </div>
    </div>
}