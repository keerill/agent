export interface Offer {
  id: number
  name: string
  activeFrom: string
  createdAt: string
  updatedAt: string
  files: OfferFile[]
}

interface OfferFile {
  id: number
  key: string
  fileName: string
  public: boolean
  type: string
  shrinkedKey: string | null
  missing: boolean
  createdAt: string
  updatedAt: string
  OfferAgreementFileOptions: {
    offerAgreementId: number
    fileId: number
  }
  downloadUrl: string
}
