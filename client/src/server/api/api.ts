import { url } from "@/config/config";

export const api = `${process.env.NODE_ENV === 'development' ? url : url}`