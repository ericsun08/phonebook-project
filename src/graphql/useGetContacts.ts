import { gql } from '@apollo/client'

export const GET_CONTACTS = gql`
    query GetContactList (
        $distinct_on: [contact_select_column!], 
        $limit: Int, 
        $offset: Int, 
        $order_by: [contact_order_by!], 
        $where: contact_bool_exp
    ) {
    contact(
        distinct_on: $distinct_on, 
        limit: $limit, 
        offset: $offset, 
        order_by: $order_by, 
        where: $where
    ){
        id
        first_name
        last_name
        phones {
            number
        }
    }
    }
`

