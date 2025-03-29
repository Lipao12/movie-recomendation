import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useMoods } from "../assets/mood";
import { Mood } from "../types";

export const MoodSelector = () => {
  const { t } = useTranslation("mood_selector");
  const moods = useMoods();

  const navigate = useNavigate();

  const handleMoodSelect = async (mood: string) => {
    try {
      navigate("/movie/recommendation", { state: { mood } });
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <header className="text-center mb-12 space-y-2">
        <h1 className="text-5xl drop-shadow-[0_0_15px_rgba(74,222,128,0.6)]">
          🎬
        </h1>
        <h1
          className="text-6xl font-bold mb-4 tracking-wider text-red-500 font-serif
          drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
        >
          {t("title")}
        </h1>
        <p className="text-xl text-gray-300 font-mono">{t("subtitle")}</p>
      </header>

      <div className="space-y-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {moods.map((mood: Mood) => (
            <button
              key={mood.key}
              onClick={() => handleMoodSelect(mood.key)}
              className={` ${mood.colors} cursor-pointer p-4 rounded-lg transition-all duration-300 flex flex-col items-center justify-center h-18 w-full`}
            >
              <span className="text-3xl mb-2">{mood.emoji}</span>
              <span className="font-medium text-gray-800 uppercase">
                {mood.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
