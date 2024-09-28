import NavItem from "./components/NavItem"

const Navigation = () => {
    return (
        <div>
            <ul className="flex justify-between items-center">
                <NavItem link="/contact" text="Contacto" />
                <NavItem link="/contact" text="Contacto" />
            </ul>
        </div>
    )
}

export default Navigation