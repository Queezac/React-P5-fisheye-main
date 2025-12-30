import PhotographersList from "../components/PhotographersList/PhotographersList.js";
import Header from "../components/Header/Header.js";

export const metadata = {
  title: "Fisheye - Accueil",
  description: "Plateforme de photographes professionnels pour vos événements et projets.",
};

export default function HomePage() {
  return (
    <main>
      <Header />
      <PhotographersList />
    </main>
  );
}
