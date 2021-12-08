import React, { RefObject } from "react";
import TemplateItem from "./TemplateItem";

type TemplateListProps = {
  ref?: RefObject<HTMLDivElement>;
  fileId?: string;
  orientation?: string;
  closeList?: (isVisible: boolean) => void;
};

export const TemplateList = React.forwardRef<HTMLDivElement, TemplateListProps>(
  ({ fileId, orientation, closeList }, ref) => {
    return (
      <div
        ref={ref}
        className={`absolute z-10 ${
          orientation === "top" ? "-top-16 left-2/4 transform -translate-x-2/4" : "top-11 -right-1"
        }`}
      >
        <ul className="relative grid grid-cols-3 w-max bg-thenex-gray-dark rounded-md overflow-hidden shadow-lg z-20">
          <TemplateItem
            fileId={fileId}
            text="Swcc"
            tooltip="Saline Water Conversion Corporation"
            closeList={closeList}
          />
          <TemplateItem
            fileId={fileId}
            text="Tgu"
            tooltip="Trinidad Generation Unlimited"
            closeList={closeList}
          />
          <TemplateItem fileId={fileId} text="Proman" tooltip="Proman" closeList={closeList} />
          <TemplateItem
            fileId={fileId}
            text="Sabic"
            tooltip="Saudi Basic Industries Corporation"
            closeList={closeList}
          />
          <TemplateItem
            fileId={fileId}
            text="Sadara"
            tooltip="Sadara Chemical Company"
            closeList={closeList}
          />
        </ul>
        <div
          className={`absolute ${
            orientation === "top"
              ? "-bottom-1 left-2/4 transform -translate-x-2/4"
              : "-top-1 right-4"
          } w-3 h-3 bg-thenex-gray-dark transform rotate-45 z-10`}
        />
      </div>
    );
  }
);
