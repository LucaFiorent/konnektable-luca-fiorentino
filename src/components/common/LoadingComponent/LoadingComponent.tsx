import { motion } from "framer-motion";
const LoadingComponent = () => {
  // create an array of length 10
  const dots = Array.from({ length: 10 }); // Dots

  return (
    <div>
      <div className="flex flex-col justify-center items-center max-w-md mx-auto py-10 sm:py-10 lg:py-20 px-10 sm:px-10 lg:px-20 bg-blue-300 dark:bg-gray-800 rounded-4xl">
        <div className="relative flex items-center overflow-hidden mb-10">
          {/* Wrapper for Pac-Man + dots */}
          <motion.div
            className="relative flex items-center z-2 w-[300px]"
            initial={{ x: -100 }} // Start Pac-Man off-screen to the left
            animate={{ x: 300 }} // Move to the right of the screen
            transition={{
              repeat: Infinity,
              duration: 3.2, // Pac-Man's movement duration
              ease: "linear",
              repeatDelay: 1,
            }}
          >
            {/* Pac-Man */}
            <div className="relative w-20 h-20 bg-yellow-400 rounded-full">
              {/* Pac-Man Mouth (Centered) */}
              <motion.div
                className="absolute top-0 left-0 w-full h-full bg-blue-300 dark:bg-gray-800 rounded-full"
                style={{
                  clipPath: "polygon(100% 40%, 100% 60%, 50% 50%)", // Mouth centered at 20x20 size
                }}
                animate={{
                  clipPath: [
                    "polygon(100% 48%, 100% 52%, 50% 50%)", // Almost closed
                    "polygon(100% 25%, 100% 75%, 50% 50%)", // Fully open
                    "polygon(100% 48%, 100% 52%, 50% 50%)", // Almost closed
                  ],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 0.3, // Speed of mouth animation
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>

          <div className="flex items-center absolute">
            {dots.map((_, index) => (
              <motion.div
                key={index}
                className="bg-white w-2 h-2 rounded-full ml-5"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{
                  repeat: Infinity,
                  duration: 0.5,
                  ease: "easeOut",
                  delay: index * 0.3,
                  repeatDelay: 3.2,
                }}
              />
            ))}
          </div>
        </div>
        <h3 className="text-3xl font-bold mt-4">Loading...</h3>
      </div>
    </div>
  );
};

export default LoadingComponent;
