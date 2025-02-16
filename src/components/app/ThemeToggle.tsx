import useThemeStore from "@/store/themeStore";
import { LuMoon, LuSun } from "react-icons/lu";
import { motion } from "framer-motion";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <motion.button
      whileHover={{ scale: 1.5, rotate: 360 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={`cursor-pointer ${
        theme === "dark" ? "text-yellow-500" : "text-blue-900"
      } px-3 py-2`}
      onClick={toggleTheme}
    >
      {theme === "light" ? <LuMoon size={26} /> : <LuSun size={26} />}
    </motion.button>
  );
};

export default ThemeToggle;
