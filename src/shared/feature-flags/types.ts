export type FlagName =
  | "installments"
  | "uploadOffers"
  | "chatBot"
  | "mortgageExceptions"
  | "actsExternalEmails"
  | "reducedPaymentTariffs"
  | "dubrovitstyClub"
  | "offerInLegalInfo"
  | "isShowWithoutMarkupToggle"
  | "mortgagePrepayments"
  | "heldBySalesManager"

export type FeatureFlag = {
  description: string
  jiraLink: string
  isOn: boolean
}

export type FeatureFlagsMap = Record<FlagName, FeatureFlag>
