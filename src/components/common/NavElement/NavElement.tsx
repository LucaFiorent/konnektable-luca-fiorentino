import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

const NavElement = ({ to, children }: { to: string; children: ReactNode }) => {
  return (
    <NavLink
      className={({ isActive }) =>
        `${
          isActive
            ? "text-white dark:text-white font-semibold"
            : "text-white hover:text-blue-600 hover:font-semibold"
        }
         flex items-center gap-2 cursor-pointer`
      }
      to={to}
    >
      {children}
    </NavLink>
  );
};

export default NavElement;
