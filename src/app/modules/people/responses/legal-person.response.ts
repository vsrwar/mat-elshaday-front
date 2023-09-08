import { PersonQualifier } from "src/app/models/enums/person-qualifier.enum";
import { AddressResponse } from "./address.response";
import { PersonType } from "src/app/models/enums/person-type.enum";
import { Cnpj } from "src/app/models/cnpj.model";
import { DepartmentResponse } from "../../departments/responses/department.response";

export interface LegalPersonResponse
{
    id: number;
    addressId: number;
    address: AddressResponse;
    qualifier: PersonQualifier;
    cnpj: Cnpj;
    corporateName: string;
    fantasyName: string | undefined;
    type: PersonType;
    departments: DepartmentResponse[] | [];
}