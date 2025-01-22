import { TbStarsFilled } from "react-icons/tb";
import styles from "./home.module.css";
import Link from "next/link";
import Image from "next/image";
import { Exo_2, Montserrat } from "next/font/google";
import { Suspense } from "react";

const exo = Exo_2({
  variable: "--font-geist-mono",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});
const montserrat = Montserrat({
  variable: "--font-geist-mono",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

const getData = async (typeTag) => {
  const req = await fetch(
    `https://api.rawg.io/api/games?key=f8843485cf0441ee8ce9ada8bf1f3610&tags=${typeTag}&page_size=50`
  );
  if (!req.ok) {
    throw new Error("Failed");
  }
  return req.json();
};

const randomTag = ["open-world", "multiplayer", "story", "modern", "war"];
const randomNum = Math.floor(Math.random() * randomTag.length);
export default async function Home() {
  const res = await getData(randomTag[randomNum]);
  const Games = res.results;
  const randomNumber2 = Math.floor(Math.random() * Games.length);
  const fristGame = Games[randomNumber2];
  return (
    <div className={styles.mainContainer}>
      <Suspense fallback={<div className="loader"></div>}>
        <div className={`${styles.homeImg} ${montserrat.className}`}>
          <Image
            src={fristGame?.background_image}
            width={700}
            height={700}
            alt="Games"
          />
          <div className={styles.imgDescription}>
            <h1>{fristGame?.name}</h1>
          </div>
        </div>
      </Suspense>
      <div className={styles.getButton}>
        <Link href={`/Pages/Games/${fristGame.id}`}>Get Now</Link>
      </div>
      <div className={styles.moreImg}>
        {fristGame.short_screenshots?.map((sc) => {
          return (
            <Image
              src={sc.image ? sc.image : "No Image"}
              alt={sc.id}
              width={250}
              height={250}
              key={sc.id}
            />
          );
        })}
      </div>
      <h2 id={styles.header} className={exo.className}>
        More Games
      </h2>
      <div className={styles.moreGames}>
        {Games.map((g) => {
          return (
            <Link href={`/Pages/Games/${g.id}`} key={g.id}>
              <Image
                src={g?.background_image}
                alt={g.name}
                width={400}
                height={350}
              />
              <div className={styles.gameRate}>
                <p>{g.name}</p>
                <p>
                  <TbStarsFilled id={styles.stars} />
                  {g?.rating}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
