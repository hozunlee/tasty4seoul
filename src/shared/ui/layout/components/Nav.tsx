"use client"

import React, { useMemo } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/shared/lib/utils"

interface NavItem {
  name: string
  link: string
  icon: React.ReactNode
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

export function NavBar({ items, className }: NavBarProps) {
  const pathname = usePathname()
  
  
  // Get the active tab based on the current path
  const activeTab = useMemo(() => {
    // For home page
    if (pathname === '/') return 'Home'
    
    // For other pages, find the first item where the pathname starts with the link
    const activeItem = items.find(item => 
      item.link !== '/' && pathname.startsWith(item.link)
    )
    
    return activeItem?.name || items[0]?.name
  }, [pathname, items])

  

  return (
    <div
      className={cn(
        "fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-50 w-auto pointer-events-none",
        className,
      )}
    >
      <div className="flex items-center gap-1 sm:gap-3 bg-background/95 border border-border backdrop-blur-lg py-2 px-2 sm:py-1 sm:px-1 rounded-full shadow-lg pointer-events-auto">
        {items.map((item) => {
          const isActive = activeTab === item.name

          return (
            <Link
              key={item.name}
              href={item.link}
              // Active state is now handled by URL
              className={cn(
                "relative flex flex-col items-center justify-center w-16 h-14 sm:w-auto sm:h-auto sm:px-4 sm:py-2 rounded-full transition-all",
                "text-foreground/80 hover:text-primary hover:bg-muted/50",
                isActive ? "text-primary" : "",
              )}
            >
              <span className={cn(
                "flex items-center justify-center w-6 h-6 sm:w-4 sm:h-4",
                isActive ? "text-primary" : "text-foreground/70"
              )}>
                {item.icon}
              </span>
              <span className={cn(
                "text-xs mt-1 sm:mt-0 sm:ml-2 sm:text-sm",
                isActive ? "text-primary font-medium block" : "text-foreground/70 hidden",
                "sm:inline"
              )}>
                {item.name}
              </span>
              {isActive && (
                <motion.span
                  layoutId="activeTab"
                  className="absolute inset-0 -z-10 bg-muted/80 dark:bg-muted/90 rounded-full"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                />
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
