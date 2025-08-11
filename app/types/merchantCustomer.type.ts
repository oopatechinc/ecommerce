import type {PaymentMethod} from "~/types/PaymentMethod.type";

export type MerchantCustomer = {
    id: number|null,
    gateway: string,
    payment_methods: PaymentMethod[]
}
