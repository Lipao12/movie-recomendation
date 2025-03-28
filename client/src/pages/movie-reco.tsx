import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const MovieReco: React.FC = () => {
  const [isReflective, setIsReflective] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const mood = location.state?.mood;

  console.log(mood);

  useEffect(() => {
    const handleMoodSelect = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const url = `http://127.0.0.1:8000/movie_recommendation?mood=${mood}`;

        const response = await fetch(url, {
          method: "GET",
        });

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
  }, []);

  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1
            className={`text-3xl font-bold ${
              isReflective ? "text-red-500" : "text-black"
            }`}
          >
            Feeling {isReflective ? "❤ Reflective" : "Reflective"}
          </h1>
        </header>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">
            The Trial of the Chicago 7 | Official Trailer | N...
          </h2>
          <div className="flex space-x-4 text-sm text-gray-600 mb-4">
            <button className="hover:text-gray-900">Assistir mais</button>
            <button className="hover:text-gray-900">Compartilhar</button>
          </div>

          <div className="border-t border-b border-gray-200 py-4 my-4">
            <button className="flex items-center text-red-600 font-medium">
              Assistir no {isReflective && "❤"} Youtube
            </button>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-2">
            The Trial of the Chicago 7
          </h2>
          <p className="text-gray-600 mb-3">2020 · 2h 9min · ▲ 7.8/10</p>

          <div className="flex space-x-3 mb-4">
            <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">
              Drama
            </span>
            <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">
              Thriller
            </span>
            <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">
              History
            </span>
          </div>

          <p className="text-gray-700 mb-6">
            The story of 7 people on trial stemming from various charges
            surrounding the uprising at the 1968 Democratic National Convention
            in Chicago, Illinois.
          </p>
        </section>

        <section className="border-t border-gray-200 pt-4 flex justify-between">
          <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            BACK
          </button>
          <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            NEXT
          </button>
        </section>
      </div>
    </div>
  );
};

export default MovieReco;
