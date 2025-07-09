"use client"

import { usePathname, useRouter } from "next/navigation"
import { ReactNode } from "react"

interface SidebarProps {
    href: string,
    title: string,
    icon: ReactNode
}
export function SidebarItem({ href, title, icon }: SidebarProps) {
    const router = useRouter();
    const pathname = usePathname()
    const selected = pathname === href
    return <div className={`flex ${selected ? " text-[#6a51a6]" : "text-slate-500"}`}
        onClick={() => router.push(href)}>
        <div className="pr-2">
            {icon}
        </div>
        <div className={`font-bold ${selected ? " text-[#6a51a6]" : "text-slate-500"}`}>
            {title}
        </div>

    </div>
}