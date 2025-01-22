import Link from "next/link";
import styles from "./exculsive.module.css";
import Image from "next/image";
import img1 from "../../assets/lasr.jpg";
import img2 from "../../assets/33.png";
const getExculsiveGames = async (param) => {
  const req = await fetch(
    `https://api.rawg.io/api/games?key=f8843485cf0441ee8ce9ada8bf1f3610&games&tags=${param}&page_size=4`
  );
  if (!req.ok) {
    throw new Error("Failed");
  }
  return req.json();
};
export default async function Exculsive() {
  const randomTag = ["multiplayer", "horror", "funny", "mysterious", "1"];
  const randomNum = Math.floor(Math.random() * randomTag.length);

  //
  const excGames = await getExculsiveGames(randomTag[randomNum]);
  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        <h1>Exclusive</h1>
        <Link href={`/Pages/Games`}>Browse All Games</Link>
      </div>
      <div className={styles.container}>
        {excGames.results.map((g) => {
          return (
            <div className={styles.excCard} key={g.id}>
              <Link href={`/Pages/Games/${g.id}`}>
                <Image
                  src={g?.background_image}
                  alt={g.name}
                  height={475}
                  width={300}
                />
                <p>{g?.name}</p>
              </Link>
            </div>
          );
        })}
      </div>
      <h2 style={{ padding: "10px" }}>Playstation Exclusives</h2>
      <div className={styles.sonyExclusive}>
        <div className={styles.sonyGame}>
          <div>
            <h3>The Last Of Us Part I</h3>
            <hr />
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo sed
              ducimus modi assumenda! Optio, sed at tempore earum maiores
              similique.
            </p>
          </div>
          <div>
            <Link href={`/Pages/Games/3990`}>
              <Image
                src={img1}
                alt="The Last Of Us I"
                width={200}
                height={250}
              />
            </Link>
          </div>
        </div>
        <div className={styles.sonyGame}>
          <div>
            <h3>Ghost Of Tsushima</h3>
            <hr />
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo sed
              ducimus modi assumenda! Optio, sed at tempore earum maiores
              similique.
            </p>
          </div>
          <div>
            <Link href={`/Pages/Games/58550`}>
              <Image
                src={img2}
                alt="Ghost Of Tsushima"
                width={200}
                height={250}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
