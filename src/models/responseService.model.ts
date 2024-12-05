import { Service } from "./service.model";

export interface ResponseService {
    code: string;
    message: string;
    data: Service;
    dataArray: Service[];
}