import type {MerchantCustomer} from "~/types/merchantCustomer.type";

export type User = {
    id: number|null,
    business_id?: number,
    firstname: string|null,
    lastname: string|null,
    full_name: string| null,
    email?: string,
    phone?: string,
    morph_class?: string,
    merchant_customers: MerchantCustomer[]
}
