import React from "react";
import { useState } from "react";

interface SearchByNameProps {
  onFilterByName: (name: string) => void;
}

export const SearchByName: React.FC<SearchByNameProps> = ({
  onFilterByName,
}) => {
  const [selectedName, setSelectedName] = useState<string>("");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const titleOrName = event.target.value;
    setSelectedName(titleOrName);
    onFilterByName(titleOrName);
  };

  return (
    <div>
      <input
        id="title_or_name"
        onChange={handleNameChange}
        value={selectedName}
        placeholder="Search Video..."
      />
    </div>
  );
};
