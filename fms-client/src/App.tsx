import { useEffect } from "react";
import RouteList from "./utils/common/NavBar/RouteList";

const App = () => {
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      const message = "Are you sure you want to leave this page?";
      event.preventDefault();
      event.returnValue = message; // Most browsers display this message
      return message;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  return (
    <>
      <RouteList />
    </>
  )
}

export default App
