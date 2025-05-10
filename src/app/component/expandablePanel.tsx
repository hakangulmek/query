"use client";
import React from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { useState } from "react";

function ExpandablePanel({
  header,
  children,
}: {
  header: React.ReactNode;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="panelTop">
      <div className="topArrangement">
        <div className="topArrangement">{header}</div>
        <div onClick={handleOpenClick}>
          {isOpen ? (
            <GoChevronRight size={20} style={{ transform: "rotate(90deg)" }} />
          ) : (
            <GoChevronLeft size={20} />
          )}
        </div>
      </div>
      <div className="content">
        {isOpen && (
          <div className="contentArrangement">
            <div className="contentArrangement">{children}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExpandablePanel;
