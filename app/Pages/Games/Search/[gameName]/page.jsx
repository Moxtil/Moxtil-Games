import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import secondImg from "../../../../assets/hand-drawn-404-error_23-2147736555.jpg";
import { Exo_2 } from "next/font/google";

const exo = Exo_2({
  variable: "--font-geist-sans",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});
const getGames = async (name) => {
  const req = await fetch(
    `https://api.rawg.io/api/games?key=f8843485cf0441ee8ce9ada8bf1f3610&games&search=${name}&page_size=50`
  );

  return req.json();
};

export default async function page({ params }) {
  const myParams = params.gameName;
  const games = await getGames(myParams);
  return (
    <div className={styles.mainContainer}>
      <div className={`${styles.header} ${exo.className}`}>
        <Link href={`/Pages/Games`}>Back To Browse Games</Link>
        <Link href={`/Pages/Friends`}>Friends List</Link>
      </div>
      <div className={styles.container}>
        {games?.results?.map((g) => {
          return (
            <Link href={`/Pages/Games/${g.id}`} key={g.id}>
              <div className={styles.gameCard}>
                <Image
                  src={g?.background_image ? g?.background_image : secondImg}
                  alt={g?.name}
                  width={350}
                  height={400}
                />
              </div>
              <div className={styles.gameDets}>
                <p>{g?.name}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
