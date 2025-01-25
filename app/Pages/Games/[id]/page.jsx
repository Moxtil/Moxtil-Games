import { Suspense } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { IoIosStar } from "react-icons/io";
import { GrValidate } from "react-icons/gr";
import { MdOutlineScreenshotMonitor } from "react-icons/md";
import { FaTags } from "react-icons/fa6";
import { CgGames } from "react-icons/cg";

import Link from "next/link";
export default async function page({ params }) {
  const getData = async () => {
    const req = await fetch(
      `https://api.rawg.io/api/games/${gameId}?key=f8843485cf0441ee8ce9ada8bf1f3610`
    );
    if (!req.ok) {
      throw new Error("Failed");
    }

    return req.json();
  };
  const gameId = params.id;

  const myGame = await getData();

  const getSimilarGames = async () => {
    const req = await fetch(
      `https://api.rawg.io/api/games?key=f8843485cf0441ee8ce9ada8bf1f3610&&search=${myGame.name}`
    );
    if (!req.ok) {
      throw new Error("Failed");
    }
    return req.json();
  };

  const similar = await getSimilarGames();

  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        <h2>{myGame?.name}</h2>
        <Link href={`/Pages/Games`}>Browse All Games</Link>
      </div>
      <div className={styles.publishersHeader}>
        {myGame?.publishers.map((pub) => {
          return (
            <div key={pub.id} className={styles.publishers}>
              <Image
                src={pub?.image_background}
                alt={pub?.slug}
                width={50}
                height={50}
              />
              <p>{pub?.name.toUpperCase()}</p>
            </div>
          );
        })}
      </div>
      <Suspense fallback={<div className="loader"></div>}>
        <div className={styles.imgContainer}>
          {myGame.background_image && (
            <Image
              className={styles.mainImg}
              src={myGame?.background_image}
              alt={myGame.name}
              fill={false}
              width={350}
              height={350}
            />
          )}
        </div>
        <div className={styles.moreImg}>
          {myGame.background_image_additional ? (
            <Image
              src={myGame?.background_image_additional}
              alt={myGame.name}
              width={250}
              height={250}
            />
          ) : (
            <h4>No More Image</h4>
          )}
        </div>
      </Suspense>
      <div className={styles.container}>
        <p>{myGame?.description_raw}</p>
        <p>
          <GrValidate />
          Released : {myGame.released}
        </p>
        <p>
          <IoIosStar className={styles.rateStar} /> {myGame?.rating}
        </p>
        <div className={styles.plats}>
          <MdOutlineScreenshotMonitor className={styles.platsIcons} />
          Available On :
          {myGame.parent_platforms.map((m) => {
            return <span key={m}>{m.platform.name}</span>;
          })}
        </div>
        <div className={styles.tags}>
          {myGame.tags.map((tag) => {
            return (
              <span key={tag}>
                <FaTags />
                {tag.name}
              </span>
            );
          })}
        </div>
      </div>
      <div>
        <h2 id={styles.secondaryHeader}>
          Similar Games <CgGames />
        </h2>
        <Suspense fallback={<div className="loader"></div>}>
          <div className={styles.similarGames}>
            {similar.results.map((sm) => {
              if (!sm.background_image) {
                return;
              }
              return (
                <Link href={`/Pages/Games/${sm.id}`} key={sm.id}>
                  <Image
                    src={sm?.background_image}
                    alt={sm.name}
                    width={300}
                    height={300}
                  />
                  <div>
                    <p>{sm?.name}</p>
                    <p>
                      {sm?.rating} <IoIosStar className={styles.rateStar} />{" "}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </Suspense>
      </div>
    </div>
  );
}
