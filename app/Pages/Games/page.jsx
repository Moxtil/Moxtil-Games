"use client";
import styles from "./games.module.css";
import Image from "next/image";
import Link from "next/link";
import secondImg from "../../assets/hand-drawn-404-error_23-2147736555.jpg";
import { IoSearch } from "react-icons/io5";
import { useState, useEffect } from "react";

export default function page() {
  const [fetchUrl, setFetchUrl] = useState(
    `https://api.rawg.io/api/games?key=f8843485cf0441ee8ce9ada8bf1f3610&games&page_size=50`
  );
  const [games, setGames] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    fetch(fetchUrl)
      .then((response) => response.json())
      .then((data) => setGames(data))
      .then(() => setLoader(false))
      .catch((error) => console.error("Error fetching data:", error));
  }, [fetchUrl]);

  const handleChanging = (event) => {
    setInputValue(event.target.value);
  };
  const searchResultsChanger = () => {
    setFetchUrl(
      `https://api.rawg.io/api/games?key=f8843485cf0441ee8ce9ada8bf1f3610&games&search=${inputValue}&page_size=50`
    );
  };
  return (
    <div className={styles.mainContainer}>
      <div className={styles.secondContainer}>
        <div className={styles.searchSide}>
          <input
            value={inputValue}
            type="text"
            placeholder="Search Here"
            onChange={handleChanging}
          />
          <div>
            <div onClick={searchResultsChanger}>
              <IoSearch className={styles.searchIcon} />
            </div>
          </div>
        </div>
        <h2>Games</h2>
      </div>

      {loader && <div className="loader"></div>}
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
