import { IconContext } from "react-icons";
import { FaPlay, FaPause, FaRedoAlt } from "react-icons/fa";

export const Controls = (props) => {
  return (
    <IconContext.Provider value={{ color: "blue", size: "1.4rem" }}>
      <div id="start_stop" onClick={() => props.handlePlayPause()}>
        <FaPlay />
        <FaPause />
      </div>
      <FaRedoAlt id="reset" onClick={() => props.handleReset()} />
    </IconContext.Provider>
  );
};
