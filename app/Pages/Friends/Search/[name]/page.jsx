import { Suspense } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import { FaUserAlt } from "react-icons/fa";

const montserrat = Montserrat({
  variable: "--font-geist-sans",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

const getData = async (username) => {
  const req = await fetch(`https://dummyjson.com/users/search?q=${username}`);
  return req.json();
};
export default async function page({ params }) {
  const userName = params.name;
  const users = await getData(userName);
  return (
    <div className={styles.mainContainer}>
      <div className={`${styles.header} ${montserrat.className}`}>
        <Link href={`/Pages/Friends`}>
          <h2>Back To Friends List</h2>
        </Link>
        <Link href={`/Pages/Games`}>
          <h2>Browse Games</h2>
        </Link>
      </div>
      <div className={styles.usersContainer}>
        <Suspense fallback={<div className="loader"></div>}>
          {users?.users?.map((us) => {
            return (
              <Link href={`/Pages/Friends/${us.id}`} key={us.id}>
                <div className={styles.userName}>
                  <p>
                    <FaUserAlt />
                    {us?.username.toUpperCase()}
                  </p>
                  <hr />
                  <span> {`${us.firstName} ${us.lastName}`}</span>
                </div>
                <div className={styles.userImg}>
                  <Image
                    src={us?.image}
                    alt={us.username}
                    width={175}
                    height={175}
                  />
                </div>
              </Link>
            );
          })}
        </Suspense>
      </div>
    </div>
  );
}
