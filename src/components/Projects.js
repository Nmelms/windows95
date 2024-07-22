import React, { useRef, useState, useContext } from "react";
import GlobalContext from "../GlobalContext";
import folder from "../assets/folder2.png";
import file from "../assets/file.png";
import Icon from "./Icon";
import { useDrag } from "@use-gesture/react";

export default function Projects({ pages, setPages, display }) {
  const { projectRef, selected, setSelected } = useContext(GlobalContext);
  const [windowPosition, setWindowPosition] = useState({
    x: 0,
    y: 0,
  });
  const [fullScreen, setFullScreen] = useState("");

  const handleClick = () => {
    setSelected("Projects");
  };

  const bindWindowPos = useDrag((params) => {
    setWindowPosition({
      x: params.offset[0],
      y: params.offset[1],
    });
  });

  const handleIconClick = (e, name) => {
    e.stopPropagation();
    if (!pages.includes(name)) {
      setPages([...pages, name]);
      setSelected(name);
    } else {
      setSelected(name);
    }
  };
  const handleCloseClick = (e) => {
    const newArr = pages;
    const filtered = newArr.filter((item) => item !== "Projects");
    setPages(filtered);

    if (projectRef.current.classList.contains("fullScreen")) {
      projectRef.current.classList.remove("fullScreen");
      projectRef.current.style.display = "none";
    }
  };

  const handleFullScreenClick = (e) => {
    e.stopPropagation();
    projectRef.current.classList.toggle("fullScreen");
  };

  const handleMinimizeClick = (e) => {
    projectRef.current.style.display = "none";
    setSelected("");
  };

  const miniDown = (e) => {
    e.stopPropagation();
  };
  return (
    <div
      onPointerDown={handleClick}
      style={
        { display: display, left: windowPosition.x, top: windowPosition.y }
        // fullScreen === "fullScreen"
        //   ? { left: "0", top: "0" }
        //   : { left: windowPosition.x, top: windowPosition.y }
      }
      data-testid="projectsWindow"
      ref={projectRef}
      className={
        selected === "Projects" ? `Projects top  ${fullScreen}` : "Projects"
      }
    >
      <nav {...bindWindowPos()} data-testid="nav" className="windowNav">
        <div className="nameAndIcon">
          <img style={{ height: "18px" }} src={folder} />
          <p>Projects</p>
        </div>
        <div className="windowNavBtns">
          <button
            onClick={(event) => handleMinimizeClick(event)}
            onPointerDown={(e) => miniDown(e)}
            className="navBtn"
          >
            _
          </button>
          <button
            onClick={(event) => handleFullScreenClick(event)}
            className="navBtn"
          >
            O
          </button>
          <button onClick={() => handleCloseClick()} className="navBtn">
            X
          </button>
        </div>
      </nav>
      <div className="projectsBody">
        <Icon
          handleClick={(e) => handleIconClick(e, "CoffeeCommerce")}
          name="Coffee Commerce"
          imgSrc={file}
          alt="Coffee site"
        />
        <Icon
          handleClick={(e) => handleIconClick(e, "Carousel")}
          name="Fancy Carousel"
          imgSrc={file}
          alt="Carousel Project"
        />
        <Icon
          handleClick={(e) => handleIconClick(e, "Burger")}
          name="Burger Restaurant"
          imgSrc={file}
          alt="burger restaurant project"
        />
        <Icon
          handleClick={(e) => handleIconClick(e, "National Parks")}
          name="National Parks"
          imgSrc={file}
          alt="national parks project"
        />
        <Icon
          handleClick={(e) => handleIconClick(e, "Planet Facts")}
          name="Planet Facts"
          imgSrc={file}
          alt="planet facts project"
        />
        <Icon
          handleClick={(e) => handleIconClick(e, "Invoice App")}
          name="Invoice App"
          imgSrc={file}
          alt="invoice project"
        />
        <Icon
          handleClick={(e) => handleIconClick(e, "Pokedex")}
          name="Pokedex"
          imgSrc={file}
          alt="Pokedex project"
        />
        <Icon
          handleClick={(e) => handleIconClick(e, "MTG Deck Builder")}
          name="MTG Deck Builder"
          imgSrc={file}
          alt="Deck builder"
        />
      </div>
    </div>
  );
}
