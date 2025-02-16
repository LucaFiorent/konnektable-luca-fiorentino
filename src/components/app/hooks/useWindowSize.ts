import { useEffect, useState } from "react";

const useWindowSize = () => {
  // set width from window
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    // function to update the state with the new width
    function handleResize() {
      setWidth(window.innerWidth);
    }

    // handle resize whenever the window change size
    window.addEventListener("resize", handleResize);
    // cleanup: remove event listener to prevent to prevent memory leaks
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // return width for use
  return width;
};

export default useWindowSize;
