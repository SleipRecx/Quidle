import ReactCountUp from "react-countup";
import { CountUpProps } from "./types";

const CountUp = ({ end }: CountUpProps) => {
  return <ReactCountUp end={end} duration={0.4} />;
};

export default CountUp;
