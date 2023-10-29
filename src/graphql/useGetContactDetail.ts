import { gql, useQuery } from "@apollo/client";
import { Contact } from "../common/interfaces/contact.interface";

export const GET_CONTACT_DETAIL = gql`
    query GetContactDetail($id: Int!){
        contact_by_pk(id: $id) {
        last_name
        first_name
        phones {
        number
        }
    }
    }
`
export const useGetContactDetail = (props:any): Contact | undefined => {
    const { data } = useQuery(GET_CONTACT_DETAIL, {
        variables: { "id": props }
    })

    return data?.contact_by_pk
}