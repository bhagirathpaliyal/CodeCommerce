import { Link } from "react-router-dom";
import man from "./../../assets/man.jpg";
import women from "./../../assets/women.jpg";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { HoverEffect } from "../ui/card-hover-effect";

function H_section2() {
  const [dataa, setdataa] = useState([
    "Electronics",
    "Jewelery",
    "Man",
    "Women",
  ]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => setdataa(data));
  }, []);

  const hoverItems = dataa.map((data, index) => {
    const route =
      data === "men's clothing"
        ? "/Products/Men"
        : data === "women's clothing"
        ? "/Products/Women"
        : `/Products/${data}`;
    const image =
      data === "men's clothing" || data === "Man" ? man : women;

    return {
      title: data,
      image: image,
      link: route,
    };
  });

  return (
    <div
      id="section2"
      className="bg-primary flex flex-col items-center justify-center text-white p-[50px]"
    >
      <div className="text-[30px] md:text-[40px]">Our collection</div>
      
      <HoverEffect items={hoverItems} />

      <Link to={"/Products/AllProducts"}>
        <Button color="inherit">See All Products</Button>
      </Link>
    </div>
  );
}

export default H_section2;
