import React from "react";

interface SearchByYearProps {
  releaseYears: number[];
  onFilterByYear: (release_year: number) => void;
}

export const SearchByYear:React.FC<SearchByYearProps> = ({ releaseYears, onFilterByYear }) => {

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedReleaseYear = parseInt(event.target.value, 10);
    onFilterByYear(selectedReleaseYear);
  };

  return (
    <div>
      <select id="release_year" onChange={handleYearChange}>
        <option value="">Search by Year...</option>
        {releaseYears.map((year: number) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}
