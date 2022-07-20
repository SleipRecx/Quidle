import ReactCountUp from "react-countup";
import { CountUpProps } from "./types";

const CountUp = ({ end, duration }: CountUpProps) => {
  return (
    <ReactCountUp
      end={end}
      duration={duration || 0.4}
      containerProps={{
        color: "red",
      }}
    />
  );
};

export default CountUp;
