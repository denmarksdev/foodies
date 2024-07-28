'use client'
import classes from './NavLink.module.css'
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, children }) {
  const path = usePathname();
  const className = path.startsWith(href) ? classes.active : null;

  return (
    <li>
      <Link href={href} className={className}>
        {children}
      </Link>
    </li>
  );
}
