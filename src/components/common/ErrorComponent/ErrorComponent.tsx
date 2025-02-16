import { AxiosError } from "axios";
import { FC } from "react";
import { LuTriangleAlert } from "react-icons/lu";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

export interface ErrorT {
  message: string;
  status: number;
  originalError: AxiosError | null;
}

interface ErrorComponentP {
  errorTitle: string;
  error: ErrorT | null;
}

const ErrorComponent: FC<ErrorComponentP> = ({ errorTitle, error }) => {
  const navigate = useNavigate();

  if (!error) return null;
  return (
    <div className="flex items-start justify-center text-white">
      <div className="flex flex-col items-center justify-center text-center w-sm sm:w-sm lg:w-md mx-auto my-5 p-15 bg-red-500/60 rounded-4xl">
        <div className="mb-4">
          <LuTriangleAlert size={50} />
        </div>
        <h2 className="text-lg uppercase mb-2 ">{errorTitle}</h2>
        <p className="text-sm">{error.message}</p>
        <div className="mt-5">
          {error.status !== 0 && (
            <Button onClickHandler={() => navigate("/")} error={true}>
              Back Home
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorComponent;
