import { ReactNode } from "react";

const Title = ({
  txtColor,
  imgUrl,
  children,
  imgInfoText,
  spaceDown = true,
}: {
  txtColor: string;
  imgUrl: string;
  children: ReactNode;
  imgInfoText: string;
  spaceDown?: true | false;
}) => {
  return (
    <div
      className={`flex items-center w-full gap-4 ${txtColor} ${
        spaceDown ? "mb-10" : ""
      }`}
    >
      <div className="w-12 h-12">
        <img className="rounded-full" src={imgUrl} alt={imgInfoText} />
      </div>
      <div className="flex gap-2 font-semibold text-2xl">{children}</div>
    </div>
  );
};

export default Title;
