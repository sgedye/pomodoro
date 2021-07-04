import { IconContext } from "react-icons";
import { FaPlay, FaPause, FaRedoAlt } from "react-icons/fa";

import styled from "styled-components";

export const Controls = ({ handlePlayPause, handleReset }) => {
  return (
    <IconContext.Provider value={{ color: "black", size: "1.5rem" }}>
      <Button id="start_stop" onClick={handlePlayPause}>
        <FaPlay />
        <FaPause />
      </Button>
      <Button id="reset" onClick={handleReset}>
        <FaRedoAlt />
      </Button>
    </IconContext.Provider>
  );
};

const Button = styled.button`
  border: none;
  background-color: transparent;
  display: inline-block;
  padding: 0.75rem 0.5rem;
  cursor: pointer;

  &:active {
    transform: translate(1px, 1px);
  }
`;
