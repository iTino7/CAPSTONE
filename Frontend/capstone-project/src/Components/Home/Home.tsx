import NavbarHome from "./NavbarHome";
import PhrasesHome from "../PhrasesHome";

function Home() {
  localStorage.clear();

  return (
    <>
      <div className="wallpaperHome ">
        <NavbarHome />
        <PhrasesHome />
      </div>
    </>
  );
}

export default Home;
