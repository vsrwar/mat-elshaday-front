import { PersonQualifier } from "src/app/models/enums/person-qualifier.enum";
import { AddressResponse } from "./address.response";
import { PersonType } from "src/app/models/enums/person-type.enum";
import { Cpf } from "src/app/models/cpf.model";
import { DepartmentResponse } from "../../departments/responses/department.response";


export interface PhysicalPersonResponse
{
    id: number;
    addressId: number;
    address: AddressResponse;
    qualifier: PersonQualifier;
    cpf: Cpf;
    name: string;
    nickName: string | undefined;
    type: PersonType;
    departments: DepartmentResponse[] | [];
}