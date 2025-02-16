import { FC, MouseEventHandler } from "react";
import Button from "../Button/Button";
interface InfoComponentP {
  title: string;
  message?: string | null;
  onClickHandler: MouseEventHandler<HTMLButtonElement>;
}

const InfoComponent: FC<InfoComponentP> = ({
  title,
  message,
  onClickHandler,
}) => {
  return (
    <div>
      <div className="flex flex-col items-center mt-5 bg-blue-300 dark:bg-gray-800 py-8 sm:py-8 lg:py-10 px-8 sm:px-8 lg:px-10 rounded-4xl">
        <div className="flex flex-col items-center text-center mb-3 sm:mb-5 gap-3 sm:gap-4 ">
          <h2 className="w-xs font-semibold text-xl sm:text-xl md:text-lg lg:text-xl uppercase">
            {title}
          </h2>
          <p className="w-40 text-md lg:text-lg">{message}</p>
        </div>
        <Button onClickHandler={onClickHandler}>Back Home</Button>
      </div>
    </div>
  );
};

export default InfoComponent;
