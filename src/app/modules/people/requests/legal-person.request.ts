import { PersonQualifier } from "src/app/models/enums/person-qualifier.enum";
import { AddressRequest } from "./address.request";

export interface LegalPersonRequest
{
    id: number | undefined;
    address: AddressRequest;
    qualifier: PersonQualifier;
    cnpj: string;
    corporateName: string;
    fantasyName: string | undefined;
}