import { useTranslation } from "react-i18next";
import { Mood } from "../types";

export const useMoods = (): Mood[] => {
  const { t } = useTranslation("moods");

  return [
    {
      key: "happy",
      name: t("happy"),
      emoji: "😊",
      colors: "bg-yellow-100 hover:bg-yellow-200",
      genres: ["Comedy", "Family", "Animation"],
    },
    {
      key: "sad",
      name: t("sad"),
      emoji: "😢",
      colors: "bg-blue-100 hover:bg-blue-200",
      genres: ["Drama", "Romance"],
    },
    {
      key: "romantic",
      name: t("romantic"),
      emoji: "🥰",
      colors: "bg-pink-100 hover:bg-pink-200",
      genres: ["Romance", "Drama", "Music"],
    },
    {
      key: "exciting",
      name: t("exciting"),
      emoji: "🤩",
      colors: "bg-red-100 hover:bg-red-200",
      genres: ["Action", "Adventure", "Thriller"],
    },
    {
      key: "scary",
      name: t("scary"),
      emoji: "😱",
      colors: "bg-purple-100 hover:bg-purple-200",
      genres: ["Horror", "Thriller", "Mystery"],
    },
    {
      key: "adventurous",
      name: t("adventurous"),
      emoji: "🤠",
      colors: "bg-green-100 hover:bg-green-200",
      genres: ["Adventure", "Fantasy", "Science Fiction"],
    },
    {
      key: "curious",
      name: t("curious"),
      emoji: "🔍",
      colors: "bg-indigo-100 hover:bg-indigo-200",
      genres: ["Documentary", "History", "Mystery"],
    },
    {
      key: "horny",
      name: t("horny"),
      emoji: "🤤",
      colors: "bg-red-400 hover:bg-red-500",
      genres: [""],
    },
    {
      key: "tense",
      name: t("tense"),
      emoji: "😰",
      colors: "bg-orange-100 hover:bg-orange-200",
      genres: ["Crime", "Thriller", "Mystery"],
    },
    {
      key: "thoughtful",
      name: t("thoughtful"),
      emoji: "🤔",
      colors: "bg-gray-100 hover:bg-gray-200",
      genres: ["Drama", "History", "War"],
    },
    {
      key: "nostalgic",
      name: t("nostalgic"),
      emoji: "🥹",
      colors: "bg-teal-100 hover:bg-teal-200",
      genres: ["Music", "Family", "Romance"],
    },
    {
      key: "relaxed",
      name: t("relaxed"),
      emoji: "😌",
      colors: "bg-emerald-100 hover:bg-emerald-200",
      genres: ["Comedy", "Animation", "Documentary"],
    },
    {
      key: "epic",
      name: t("epic"),
      emoji: "⚔️",
      colors: "bg-amber-100 hover:bg-amber-200",
      genres: ["War", "History", "Adventure", "Western"],
    },
    {
      key: "intriguing",
      name: t("intriguing"),
      emoji: "🧐",
      colors: "bg-cyan-100 hover:bg-cyan-200",
      genres: ["Foreign", "Mystery", "Documentary"],
    },
    {
      key: "light",
      name: t("light"),
      emoji: "☁️",
      colors: "bg-lime-100 hover:bg-lime-200",
      genres: ["Comedy", "Family", "TV Movie"],
    },
  ];
};
