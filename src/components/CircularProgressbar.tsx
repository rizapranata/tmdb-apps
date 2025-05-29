import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function CircularProgress() {
  return (
    <div className="m-auto w-10 h-10 md:w-10 md:h-10 xl:w-15 xl:h-15 2xl:w-20 2xl:h-20">
      <CircularProgressbar
        value={70}
        text={`${70}%`}
        styles={buildStyles({
          pathColor: "red",
          textColor: "#fff",
          trailColor: "#e5e7eb",
        })}
      />
    </div>
  );
}
