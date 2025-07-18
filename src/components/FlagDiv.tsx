import React from "react";

interface FlagDivProps {
  id: string;
  name: string;
  flag_image: string;
  onClick?: () => void;
}

const FlagDiv: React.FC<FlagDivProps> = ({ name, flag_image, onClick }) => (
  <div
    className="flex items-center bg-white rounded-lg shadow-md px-4 py-3 min-w-[140px] max-w-[200px] w-full cursor-pointer hover:shadow-lg transition"
    onClick={onClick}
  >
    <img
      src={flag_image}
      alt={name + " flag"}
      className="w-10 h-7 object-cover rounded mr-3 border"
      loading="lazy"
    />
    <span
      className="font-semibold text-lg text-gray-800"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {name}
    </span>
  </div>
);

export default FlagDiv;
