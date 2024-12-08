import { IoLogOutSharp } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { RiRestartFill } from "react-icons/ri";
import { IoAddCircle } from "react-icons/io5";

import ButtonDanger from "./components/dangerZone/ButtonDanger";
import ButtonAdd from "./components/dangerZone/ButtonAdd";

import { DangerZonePropsType } from "@/types/profile.types";

const DangerZone = ({ handleIsRestart, handleIsRemove, handleIsLogout, completeAncestry, ancestors, ancestryNumber }: DangerZonePropsType) => {

    return (
        <div className="w-full border-t border-gray-300 my-8 p-4 mx-auto max-w-4xl">
            <p className="text-2xl font-semibold mb-4">Más opciones</p>
            <div className="space-y-4">
                <ButtonAdd text="Añadir ancestro" textButton="Agregar" completeAncestry={completeAncestry} Icon={IoAddCircle} ancestors={ancestors} ancestryNumber={ancestryNumber} />
                <ButtonDanger text="Cerrar la sesión del usuario" textButton="Cerrar sesión" func={handleIsLogout} Icon={IoLogOutSharp} />
                <ButtonDanger text="Restaurar información rellenada" textButton="Restaurar" func={handleIsRestart} Icon={RiRestartFill} />
                <ButtonDanger text="Eliminar usuario" textButton="Eliminar" func={handleIsRemove} Icon={FaTrash} />
            </div>
        </div>
    );
};

export default DangerZone;
