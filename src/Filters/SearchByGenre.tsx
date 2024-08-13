import React from 'react';
import Select, { MultiValue } from 'react-select';

interface Genre {
  id: number;
  name: string;
}

interface SearchByGenreProps {
  genres: Genre[];
  selectedGenres: Genre[];
  onFilterByGenre: (selectedGenres: Genre[]) => void;
}

export const SearchByGenre: React.FC<SearchByGenreProps> = ({ genres, selectedGenres, onFilterByGenre }) => {

  const handleGenreChange = (selectedOptions: MultiValue<{ value: number, label: string }>) => {
    const selectedGenres = selectedOptions.map(option => ({
      id: option.value,
      name: option.label
    }));
    onFilterByGenre(selectedGenres);
  };

  const genreOptions = genres.map(genre => ({
    value: genre.id,
    label: genre.name
  }));

  return (
    <div>
      <Select
        id="genres"
        isMulti
        value={selectedGenres.map(genre => ({ value: genre.id, label: genre.name }))}
        options={genreOptions}
        onChange={handleGenreChange}
        closeMenuOnSelect={false}
        placeholder="Search by Genre:"
      />
    </div>
  );
};
