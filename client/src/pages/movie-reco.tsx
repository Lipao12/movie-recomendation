import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { useMoods } from "../assets/mood";
import { Loading } from "../components/loading";
import { Movie } from "../types";

const MovieReco: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const mood = location.state?.mood;
  const moods = useMoods();
  const selectedMood = moods.find((m) => m.key === mood);
  const { t, i18n } = useTranslation("movie_reco");
  const [reco, setReco] = useState<Movie[] | null>(null);
  const navigate = useNavigate();

  const emojis = ["😊", "😢", "🥰", "🤠"];
  const [currentEmoji, setCurrentEmoji] = useState(emojis[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentEmoji((prevEmoji) => {
        const nextIndex = (emojis.indexOf(prevEmoji) + 1) % emojis.length;
        return emojis[nextIndex];
      });
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  if (mood === "horny") {
    return (
      <div>
        <header
          className="mb-8 text-center p-2 bg-gray-800 rounded-xl flex flex-row 
        justify-between items-center drop-shadow-2xl"
        >
          <h1
            className={`md:text-3xl text-xl font-bold drop-shadow-[0_0_15px_rgba(74,222,128,0.6)]`}
          >
            🎬
          </h1>
          <h1 className={`md:text-3xl text-xl font-bold text-red-500`}>
            {t("felling")} {`${selectedMood?.emoji} ${selectedMood?.name}`}
          </h1>
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="md:p-4 p-1 max-md:w-16 flex flex-col text-white bg-red-700 rounded-xl"
          >
            <span className="mr-2 text-md md:text-lg">{currentEmoji}</span>
            {t("change_mood")}
          </button>
        </header>

        <div>
          <span className="p-4 rounded-xl flex justify-center bg-gray-800 text-gray-300 mb-3  text-center">
            Hmm... acho que não é esse site que você tá procurando, hein? 🤨😂
            Melhor abrir uma aba anônima! 🚀🔥
          </span>
        </div>
      </div>
    );
  }
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextMovie = () => {
    if (reco && currentIndex < reco.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPreviousMovie = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    const handleMoodSelect = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const url = `http://127.0.0.1:8000/movie_recommendation?mood=${mood}`;

        const response = await fetch(url, {
          method: "GET",
        });
        const data = await response.json();
        setReco(data.movies_related);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || "Error");
        }
      } catch (error) {
        console.error("Erro:", error);
        setError(error instanceof Error ? error.message : "Erro desconhecido");
      } finally {
        setIsLoading(false);
      }
    };

    handleMoodSelect();
  }, [mood]);

  const movie = reco ? reco[currentIndex] : null;

  function formatMinutesToHours(minutos: number): string {
    const horas = Math.floor(minutos / 60);
    const minsRestantes = minutos % 60;

    let resultado = "";

    if (horas > 0) {
      resultado += `${horas}h `;
    }

    if (minsRestantes > 0 || horas === 0) {
      resultado += `${minsRestantes}min`;
    }

    return resultado.trim();
  }

  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-4xl mx-auto">
        <header
          className="mb-8 text-center p-2 bg-gray-800 rounded-xl flex flex-row 
        justify-between items-center drop-shadow-2xl"
        >
          <h1
            className={`md:text-3xl text-xl font-bold drop-shadow-[0_0_15px_rgba(74,222,128,0.6)]`}
          >
            🎬
          </h1>
          <h1 className={`md:text-3xl text-xl font-bold text-red-500`}>
            {t("felling")} {`${selectedMood?.emoji} ${selectedMood?.name}`}
          </h1>
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="md:p-4 p-1 max-md:w-16 flex flex-col text-white bg-red-700 rounded-xl"
          >
            <span className="mr-2 text-md md:text-lg">{currentEmoji}</span>
            {t("change_mood")}
          </button>
        </header>
        {isLoading ? (
          <Loading />
        ) : movie ? (
          <div className="transition duration-100">
            {i18n.language === "pt" && (
              <span className="p-4 rounded-xl flex bg-gray-800 text-gray-300 mb-3">
                Hahaha! Não tem em português, não! Se vira com o inglês mesmo,
                campeão! 🚀😂
              </span>
            )}
            <div className="bg-gray-800 p-4 rounded-xl">
              <div className="w-full h-60 bg-gray-700 flex items-center justify-center text-center p-4 rounded-lg">
                <p className="text-gray-300 text-sm">{t("thumb")}</p>
              </div>

              <div className="movie-item bg-gray-800 text-white p-4 rounded-lg mb-4 space-y-3">
                <h2 className="text-2xl font-bold">{movie.original_title}</h2>
                <div className="flex flex-row space-x-2 items-center">
                  <h1>{movie.release_date.split("-")[0]}</h1>
                  <div className="h-1 w-1 bg-white rounded-full" />
                  <h1>{formatMinutesToHours(movie.runtime)}</h1>
                  <div className="h-1 w-1 bg-white rounded-full" />
                  <h1>⭐ {movie.vote_average}/10</h1>
                </div>
                <div className="flex flex-row items-center overflow-auto space-x-2">
                  {movie.genres.map((genre: string) => {
                    return (
                      <div className=" px-2 border-2 rounded-4xl border-amber-700 bg-transparent">
                        <span className="text-sm text-amber-700 font-bold">
                          {genre}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <span>{movie.overview}</span>
                <p>{movie.adult ? "Adult content" : "Not adult content"}</p>
                <a
                  href={`https://www.imdb.com/title/${movie.imdb_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  {t("view")}
                </a>
              </div>

              {/* Botões para navegar entre os filmes */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={goToPreviousMovie}
                  className={`cursor-pointer transition-all duration-100 ${
                    currentIndex === 0 ? " bg-gray-500" : "bg-red-700"
                  } text-white p-2 rounded-xl`}
                  disabled={currentIndex === 0}
                >
                  {t("previous")}
                </button>
                <button
                  onClick={goToNextMovie}
                  className={`cursor-pointer transition-all duration-100 ${
                    reco && currentIndex === reco.length - 1
                      ? " bg-gray-500"
                      : "bg-red-700"
                  } text-white p-2 rounded-xl`}
                  disabled={reco ? currentIndex === reco.length - 1 : false}
                >
                  {t("next")}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p>😢😢 {error} 😢😢</p>
        )}
      </div>
    </div>
  );
};

export default MovieReco;
