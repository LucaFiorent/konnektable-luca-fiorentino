import { ReactNode } from "react";

const HomeContent = ({ children }: { children: ReactNode }) => {
  return <div className="flex justify-between">{children}</div>;
};

export default HomeContent;
