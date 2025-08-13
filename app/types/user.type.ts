import type {MerchantCustomer} from "~/types/merchantCustomer.type";

export type User = {
    id?: number,
    business_id?: number,
    firstname: string,
    lastname: string,
    full_name?: string,
    email?: string,
    phone?: string,
    morph_class?: string,
    merchant_customers?: MerchantCustomer[]
}
