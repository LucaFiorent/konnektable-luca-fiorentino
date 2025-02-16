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
      <div className="flex flex-col items-center mt-20 bg-blue-300 dark:bg-gray-800 py-10 sm:py-10 lg:py-20 px-10 sm:px-10 lg:px-20 rounded-4xl">
        <div className="flex flex-col items-center text-center mb-8 sm:10 gap-5 sm:gap-6 ">
          <h2 className="font-semibold text-xl sm:text-xl md:text-2xl lg:text-2xl uppercase">
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
