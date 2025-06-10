import React from 'react';



import { NavBar } from "@/shared/ui/layout/components/Nav"
import { Home, MessageSquare, User } from "lucide-react"


const navItems = [
  {
    name: "Home",
    link: "/",
    icon: <Home className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "About",
    link: "/about",
    icon: <User className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Contact",
    link: "/contact",
    icon: <MessageSquare className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
]


export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <NavBar items={navItems} />
      {children}
      <footer className='hidden md:block'>© 2025 By HOLOLOG.</footer>
    </div>
  );
}