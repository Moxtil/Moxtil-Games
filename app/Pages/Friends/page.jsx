"use client";
import Link from "next/link";
import styles from "./page.module.css";
import Image from "next/image";
import { FaUserAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";

export default function page() {
  const [fetchUrl, setFetchUrl] = useState("https://dummyjson.com/users");
  const [users, setUsers] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    fetch(fetchUrl)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .then(() => setLoader(false))
      .catch((error) => console.error("Error fetching data:", error));
  }, [fetchUrl]);

  const handleChanging = (event) => {
    setInputValue(event.target.value);
  };

  const fetchUrlChangeHandler = () => {
    setFetchUrl(`https://dummyjson.com/users/search?q=${inputValue}`);
  };
  return (
    <div className={styles.mainContainer}>
      <h2>Friends</h2>
      <div className={styles.searchSide}>
        <input
          value={inputValue}
          type="text"
          placeholder="Search Here"
          onChange={handleChanging}
        />
        <div>
          <div onClick={fetchUrlChangeHandler}>
            <IoSearch className={styles.searchIcon} />
          </div>
        </div>
      </div>
      {loader && <div className="loader"></div>}
      <div className={styles.container}>
        {!users && <div>No Results Found</div>}
        {users &&
          users?.users?.map((us) => {
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
                    width={100}
                    height={100}
                  />
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}
