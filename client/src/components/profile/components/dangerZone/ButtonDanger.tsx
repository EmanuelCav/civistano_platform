import { ButtonDangerPropsType } from "@/types/profile.types";

const ButtonDanger = ({ text, textButton, func, Icon }: ButtonDangerPropsType) => {
    return (
        <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between w-full px-4 py-2 bg-gray-50 rounded shadow-md border border-gray-200">
            <p className="text-gray-900 text-lg font-semibold mb-2 sm:mb-0 sm:mr-4">
                {text}
            </p>
            <button
                className="flex items-center justify-evenly bg-red-600 border p-2 text-white hover:bg-red-700 active:bg-red-600 rounded font-semibold w-44 transition-all duration-200"
                onClick={func}>
                <Icon size={20} color={'#fff'} />
                <p className="text-md">{textButton}</p>
            </button>
        </div>
    );
};

export default ButtonDanger;
