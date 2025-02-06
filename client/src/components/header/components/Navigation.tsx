import NavItem from "./components/NavItem"

const Navigation = () => {
    return (
        <nav>
            <ul className="flex justify-between items-center">
                <NavItem link="/contact" text="Contacto" />
                <NavItem link="/about" text="Nosotros" />
                <NavItem link="/questions" text="Preguntas Frecuentes" />
            </ul>
        </nav>
    )
}

export default Navigation