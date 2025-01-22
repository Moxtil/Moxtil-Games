import styles from "./page.module.css";
import Image from "next/image";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaHashtag, FaUniversity, FaRegCalendarAlt } from "react-icons/fa";
import { BiMaleFemale, BiWorld } from "react-icons/bi";
import { IoMail } from "react-icons/io5";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import { Suspense } from "react";
const montserrat = Montserrat({
  variable: "--font-geist-sans",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

const getUser = async (id) => {
  const req = await fetch(`https://dummyjson.com/users/${id}`);

  return req.json();
};
export default async function page({ params }) {
  const userId = params.id;
  const user = await getUser(userId);
  return (
    <div className={styles.mainContainer}>
      <div className={`${styles.header} ${montserrat.className}`}>
        <Link href={`/Pages/Friends`}>
          <h4>Back To Friends List</h4>
        </Link>
        <Link href={`/Pages/Games`}>
          <h4>Browse Games</h4>
        </Link>
      </div>
      <Suspense fallback={<div className="loader"></div>}>
        <div className={styles.container}>
          <div className={styles.userImg}>
            <Image
              src={user?.image}
              alt={user?.username}
              width={200}
              height={250}
            />
          </div>
          <div className={styles.userDetails}>
            <h1>{user?.username.toUpperCase()}</h1>
            <hr />
            <p>
              <FaHashtag className={styles.icons} />
              {user?.firstName} {user.lastName}
            </p>
            <p>
              <BiMaleFemale className={styles.icons} />
              {user?.gender}
            </p>
            <p>
              <FaRegCalendarAlt className={styles.icons} />
              {user?.birthDate}
            </p>
            <p>
              <BiWorld className={styles.icons} />
              {user?.address.country}
            </p>
            <p>
              <FaUniversity className={styles.icons} />
              {user?.university}
            </p>
            <p>
              <IoMail className={styles.icons} />
              {user?.email}
            </p>
            <h4>
              <MdAdminPanelSettings className={styles.adminIcon} />
              {user?.role}
            </h4>
          </div>
        </div>
      </Suspense>
    </div>
  );
}
