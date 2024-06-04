import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { useState } from "preact/hooks"

const Header: QuartzComponent = ({ children }: QuartzComponentProps) => {
  console.log("Header component rendered")
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    console.log("Menu toggled. Current state before toggle:", menuOpen)
    setMenuOpen(!menuOpen)
    console.log("Menu toggled. Current state after toggle:", !menuOpen)
  }

  return (
    <header id="main-header">
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
#main-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 2rem 0;
  gap: 1.5rem;
}

#main-header h1 {
  margin: 0;
  flex: auto;
}

#main-header .hamburger-menu {
  display: none;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
}

#main-header .nav-links {
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
}

@media all and (max-width: 768px) {
  #main-header .hamburger-menu {
    display: block !important;
  }

  #main-header .nav-links {
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

  #main-header .nav-links.open {
    display: flex;
  }
}
`

export default (() => Header) satisfies QuartzComponentConstructor
