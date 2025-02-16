import { motion } from "framer-motion";
import { MouseEventHandler, ReactNode } from "react";

const Button = ({
  children,
  onClickHandler,
  error = false,
  uppercase = false,
  plain = false,
  extraStyles = false,
}: {
  children: ReactNode;
  onClickHandler: MouseEventHandler<HTMLButtonElement>;
  error?: boolean;
  uppercase?: boolean;
  plain?: boolean;
  extraStyles?: string | false;
}) => {
  // determines the button's stylings based on the props
  //  - "plain && error": A red button for errors
  //  - "!plain && !error": A blue or purple button / light and dark mode
  //  - "plain && !error": A text based button
  const typeOfButton =
    !plain && error
      ? "px-6 py-4 bg-red-500 hover:bg-red-800 text-white rounded-full text-sm lg:text-md"
      : !plain && !error
      ? "px-10 py-5 rounded-full text-white text-sm lg:text-md bg-blue-600 hover:bg-blue-800 dark:bg-purple-700 hover:bg-purple-800"
      : "text-blue-600 dark:text-white text-lg";

  return (
    <button
      className={`cursor-pointer font-semibold ${typeOfButton} ${
        uppercase && "uppercase"
      } ${extraStyles && extraStyles}`}
      onClick={onClickHandler}
    >
      <motion.div
        className="flex items-center gap-2"
        whileHover={{ scale: 1.1 }}
      >
        {children}
      </motion.div>
    </button>
  );
};

export default Button;
