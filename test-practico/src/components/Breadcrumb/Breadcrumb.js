import React from "react";
import "./breadcrumb.scss";

const Breadcrumb = ({ elements }) => {
  return (
    <div>
      {elements?.map((element, index) => (
        <React.Fragment key={index}>
          <span
            className={
              index === elements.length - 1 ? "boldElement" : "breadElement"
            }
          >
            {" "}
            {element}
          </span>
          {index !== elements.length - 1 && (
            <span className={"breadElement"}> {">"} </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumb;
