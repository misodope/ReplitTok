import { useState, useEffect } from "react";
import classNames from "classnames";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";
import "animate.css";

const LeftSide = ({ clicked }) => {
  const leftText = "[a";
  const leftClass = classNames("text-9xl animate__animated animate__fadeInLeft animate__delay-2s", {
    animate__fadeOutUp: clicked,
  });
  return <div className={leftClass}>{leftText}</div>;
};

const RightSide = ({ clicked }) => {
  const rightText = "s]";
  const rightClass = classNames("text-9xl animate__animated animate__fadeInRight animate__delay-2s", {
    animate__fadeOutUp: clicked,
  });
  return <div className={rightClass}>{rightText}</div>;
};

const Home = () => {
  const [clicked, setClicked] = useState(false);
  const [intervalId, setIntervalId] = useState();
  const [loaderValue, setLoaderValue] = useState(0);
  const [loaderClass, setLoaderClass] = useState("");

  const onEnter = (e) => {
    e.preventDefault();

    // setClicked(!clicked);
  };

  useEffect(() => {
    if (!loaderValue) {
      const timer = setInterval(() => {
        setLoaderValue((prev) => prev + 1);
      }, 10);

      setIntervalId(timer);
    } else if (loaderValue === 100) {
      setLoaderClass(
        classNames({
          "animate__animated animate__fadeOut animate__delay-1.5s": loaderValue === 100,
        }),
      );

      setTimeout(() => {
        setLoaderClass("poo");
      }, 1500);

      clearInterval(intervalId);
    }
  }, [loaderValue]);

  return (
    <div onClick={onEnter} className="flex items-center min-h-screen justify-center">
      <div style={{ width: 200, height: 200 }}>
        <CircularProgressbar
          value={loaderValue}
          maxValue={100}
          text={`${loaderValue}%`}
          styles={buildStyles({
            pathColor: `rgba(0, 0, 0, ${loaderValue / 100})`,
            textColor: "#000",
            trailColor: "#fff",
            backgroundColor: "#000",
            width: 200,
            height: 200,
          })}
          className={loaderClass}
        />
        <div className="flex items-center justify-center py-2">
          {loaderValue === 100 && <LeftSide clicked={clicked} />}
          {loaderValue === 100 && <RightSide clicked={clicked} />}
        </div>
      </div>
    </div>
  );
};

export default Home;
