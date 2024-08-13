import React from "react";
import { SearchByYear } from "./SearchByYear";
import { SearchByName } from "./SearchByName";
import { SearchByGenre } from "./SearchByGenre";
import './Filters.css';

export interface Genre {
  id: number;
  name: string;
}

interface GenreProps {
  genres: Genre[];
  releaseYears: number[];
  selectedGenres: Genre[];
  onFilterByGenre: (selectedGenres: Genre[]) => void;
  onFilterByYear: (release_year?: number) => void;
  onFilterByName: (name: string) => void;
}

export const Filters: React.FC<GenreProps> = ({ genres, releaseYears, selectedGenres, onFilterByGenre, onFilterByYear, onFilterByName }) => {
  return (
    <div className="filters">
      <SearchByName onFilterByName={onFilterByName}/>
      <SearchByYear releaseYears={releaseYears} onFilterByYear={onFilterByYear}/>
      <SearchByGenre genres={genres} selectedGenres={selectedGenres} onFilterByGenre={onFilterByGenre} />
    </div>
  );
};
