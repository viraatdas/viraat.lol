import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { useState } from "preact/hooks"

const Header: QuartzComponent = ({ children }: QuartzComponentProps) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    console.log("Menu toggled. Current state before toggle:", menuOpen)
    setMenuOpen(!menuOpen)
    console.log("Menu toggled. Current state after toggle:", !menuOpen)
  }

  return (
    <header>
      <button className="hamburger-menu" onClick={toggleMenu}>
        ☰
      </button>
      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        {children}
      </nav>
    </header>
  )
}

Header.css = `
header {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 2rem 0;
  gap: 1.5rem;
}

header h1 {
  margin: 0;
  flex: auto;
}

.hamburger-menu {
  display: none;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
}

.nav-links {
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
}

@media all and (max-width: 768px) {
  .hamburger-menu {
    display: block !important;
  }

  .nav-links {
    display: none;
    flex-direction: column;
    gap: 1rem;
    position: absolute;
    top: 4rem;
    left: 0;
    width: 100%;
    background-color: white;
    padding: 1rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .nav-links.open {
    display: flex;
  }
}
`

export default (() => Header) satisfies QuartzComponentConstructor
