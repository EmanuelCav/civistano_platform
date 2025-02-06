import Image from "next/image";

import { IPosibility } from "@/interface/General";

const Posibility = ({ posibility }: { posibility: IPosibility }) => {
    return (
        <div className="max-w-4xl mx-auto my-4 p-4 bg-white rounded-lg shadow-md shadow-gray-300 w-full flex justify-start items-center hover:shadow-lg transition-shadow">
            <Image
                src={posibility.image}
                alt={`image-${posibility.title}`}
                width={85}
                height={85}
                className="rounded-md"
                loading="lazy"
            />
            <div className="ml-6">
                <p className="text-lg font-semibold text-sky-700">{posibility.title}</p>
                <p className="text-gray-700">{posibility.description}</p>
            </div>
        </div>
    );
};

export default Posibility;
