import { RoutesProps } from "./props.types";

export type ButtonAuthHomePropsType = {
    title: string;
    text: string;
    func: (route: keyof RoutesProps) => void;
    route: keyof RoutesProps;
}