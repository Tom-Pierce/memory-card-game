import pokeballLogo from "../assets/pokeball.png";

export default function Header() {
  return (
    <header className="header">
      <img
        src={pokeballLogo}
        alt="Pokeball Logo"
        className="pokeball-header-logo"
      />
      <h1>PokeMemory</h1>
    </header>
  );
}
