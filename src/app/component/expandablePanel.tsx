import React from "react";
import { GoChevronLeft } from "react-icons/go";

function expandablePanel({
  header,
  children,
}: {
  header: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="panelTop">
      <div className="topArrangement">
        <div className="topArrangement">{header}</div>
        <div>
          <GoChevronLeft size={20} color="red" />
        </div>
      </div>
      <div className="content">{children}</div>
    </div>
  );
}

export default expandablePanel;
