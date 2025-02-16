import { FC } from "react";
import { Outlet } from "react-router-dom";
import HomeContent from "./HomeContent";

const HomeContainer: FC = () => {
  return (
    <HomeContent>
      <Outlet />
    </HomeContent>
  );
};

export default HomeContainer;
