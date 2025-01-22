"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { IoHomeOutline, IoGameControllerOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { FaUserFriends } from "react-icons/fa";
import { CiMenuFries, CiMenuBurger } from "react-icons/ci";
import styles from "./navbar.module.css";
import Link from "next/link";

export default function Navbar() {
  const path = usePathname();
  const [mobileMode, setMobileMode] = useState(false);
  const changeMode = () => {
    setMobileMode((prev) => (prev == false ? true : false));
  };
  return (
    <nav className={styles.navbar}>
      <Link href={`/`} className={styles.logo}>
        <h1>
          Moxtil <span>Store</span>
        </h1>
      </Link>
      <div
        className={`${styles.navLinks} `}
        style={mobileMode ? { maxHeight: "500px" } : { maxHeight: "0px" }}
      >
        <Link href={`/`} className={path == "/" ? "active" : ""}>
          <IoHomeOutline />
          <span>Home</span>
        </Link>
        <Link
          href={`/Pages/Exclusive`}
          className={path == "/Pages/Exclusive" ? "active" : ""}
        >
          <BiCategory />
          <span>Exclusive</span>
        </Link>
        <Link
          href={`/Pages/Games`}
          className={path.includes("/Pages/Games") ? "active" : ""}
        >
          <IoGameControllerOutline />
          <span>Games</span>
        </Link>
        <Link
          href={`/Pages/Friends`}
          className={path.includes("/Pages/Friends") ? "active" : ""}
        >
          <FaUserFriends />
          <span>Friends</span>
        </Link>
      </div>
      <div onClick={changeMode}>
        {mobileMode ? (
          <CiMenuBurger className={styles.menu} />
        ) : (
          <CiMenuFries className={styles.menu} />
        )}
      </div>
    </nav>
  );
}
