import { useState } from "react";

import ContainerFixed from "../general/ContainerFixed"

import { CodeFormPropsType } from "@/types/auth.types";
import { codeUser } from "@/server/actions/user.action";

const CodeForm = ({ dispatch, router, token }: CodeFormPropsType) => {

    const [code, setCode] = useState<string[]>(Array(6).fill(""));

    const handleChange = (value: string, index: number) => {
        if (/^\d*$/.test(value)) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);

            if (value && index < 5) {
                const nextInput = document.getElementById(`digit-${index + 1}`);
                nextInput?.focus();
            }
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (event.key === "Backspace" && !code[index] && index > 0) {
            const previousInput = document.getElementById(`digit-${index - 1}`);
            previousInput?.focus();
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(codeUser({
            codeData: {
                code: code.join('')
            },
            router,
            token
        }))
    };

    return (
        <ContainerFixed>
            <p className="text-xl text-gray-900 font-semibold">Revisa tu bandeja de correo electrónico</p>
            <form className="flex flex-col items-center justify-center p-6 space-y-4 w-full" onSubmit={handleSubmit}>
                <div className="flex space-x-2">
                    {code.map((digit, index) => (
                        <input
                            key={index}
                            id={`digit-${index}`}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(e.target.value, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className="w-12 h-12 text-center text-2xl border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    ))}
                </div>
                <div className="w-full my-4">
                    <button className="text-white w-full bg-sky-700 hover:bg-sky-800 active:bg-sky-700 font-medium rounded-lg text-lg px-4 py-2 mt-4">
                        ACEPTAR
                    </button>
                </div>
            </form>
        </ContainerFixed>
    )
}

export default CodeForm