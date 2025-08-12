export const useValidationRules = () => {
    let {t} = useI18n()

    const nameRules = [
        value => {
            if (value) return true
            return t('validation_rules_name_required')
        },
        value => {
            if (value?.length <= 50) return true
            return t('validation_rules_name_length')
        },
    ]

    const emailRules = [
        value => {
            if (value) return true
            return t('validation_rules_email_required')
        },
        value => {
            if (/.+@.+\..+/.test(value)) return true

            return t('validation_rules_email_valid')
        },
    ]

    const loginPasswordRules = [
        value => {
            if (value) return true
            return t('validation_rules_password_required')
        }
    ]

    const registrationPasswordRules = [
        ...loginPasswordRules,
        value => {
            if (value?.length >= 8) return true
            return t('validation_rules_password_length')
        },
    ]

    const messageRules = [
        value => {
            if (value) return true

            return t('validation_rules_message_required')
        }
    ]

    const genericRequiredRule = (errorMessage) => [
        (value) => {
            if (Array.isArray(value) && value.length  === 0) return errorMessage
            if (!value) return errorMessage

            return true
        }
    ]


    return {
        nameRules,
        emailRules,
        loginPasswordRules,
        registrationPasswordRules,
        messageRules,
        genericRequiredRule
    }
}