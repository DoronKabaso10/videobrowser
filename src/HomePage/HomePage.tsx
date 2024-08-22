import { useEffect, useState, useCallback } from "react";
import { AppHeader } from "../AppHeader/AppHeader";
import { Filters, Genre } from "../Filters/Filters";
import { VideoList } from "../VideoList/VideoList";
import { VideoItem } from "../VideoList/VideoCard";

function HomePage() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<VideoItem[]> ([]);
  const [genres, setGenres] = useState([]);
  const [releaseYears, setReleaseYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>();
  const [selectedName, setSelectedName] = useState<string>();
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/main/data/dataset.json"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch json data");
        }
        const data = await response.json();
        console.log(data);
        setGenres(data.genres);
        setVideos(data.videos);
        setFilteredVideos(data.videos);
        updateReleaseYears(data.videos);
      } catch (error) {
        console.error("Error while fetching movies data:", error);
      }
    };
    fetchData();
  }, []);

  const updateReleaseYears = (videos: VideoItem[]) => {
    const release_years = videos.map((video: VideoItem) => video.release_year);
    const uniqueSortedYears = Array.from(new Set(release_years)).sort((a, b) => {
        if (typeof a !== 'number' || typeof b !== 'number') {
            throw new Error('Cannot sort released years of non number type')
        } else {
            return b - a;
        }
    });
    setReleaseYears(uniqueSortedYears as number[]);
  }

  const applyFilters = (videos: VideoItem[], selectedGenres: Genre[], selectedYear?: number, selectedName?:string) => {
    let filtered = videos;
    const selectedGenresId = selectedGenres.map((genre: Genre) => genre.id);
    if (selectedGenresId.length > 0) {
      filtered = filtered.filter((video: VideoItem) => selectedGenresId.includes(video.genre_id));
    }
    if (selectedYear) {
      filtered = filtered.filter((video: VideoItem) => video.release_year === selectedYear);
    }
    if (selectedName) {
        filtered = filtered.filter((video: VideoItem) => {
            const titleMatch = typeof video.title === 'string' && video.title.toLowerCase().includes(selectedName.toLowerCase());
            const artistMatch = typeof video.artist === 'string' && video.artist.toLowerCase().includes(selectedName.toLowerCase());
            return titleMatch || artistMatch;
        });
    }
    return filtered;
  };

  const onFilterByGenre = useCallback((selectedGenres: Genre[]) => {
    setSelectedGenres(selectedGenres);
  }, []);

  const onFilterByYear = useCallback((release_year?: number) => {
    setSelectedYear(release_year);
  }, []);

  const onFilterByName = useCallback((name: string) => {
    setSelectedName(name);
  }, []);

  useEffect(() => {
    const filtered:VideoItem[] = applyFilters(videos, selectedGenres, selectedYear, selectedName);
    updateReleaseYears(filtered);
    setFilteredVideos(filtered);
  }, [videos, selectedGenres, selectedYear, selectedName]);

  return (
    <div className="home-page">
      <AppHeader />
      <Filters onFilterByName={onFilterByName} selectedGenres={selectedGenres} onFilterByYear={onFilterByYear} onFilterByGenre={onFilterByGenre} genres={genres} releaseYears={releaseYears}/>
      <VideoList videos={filteredVideos} />
    </div>
  );
}

export default HomePage;
