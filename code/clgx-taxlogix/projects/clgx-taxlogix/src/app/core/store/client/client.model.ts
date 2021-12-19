import { AppState } from '../../core.module';

export interface Client{
    clientName: string | undefined,
    branchId: string | undefined,
    isActive: string | undefined,
    stateCode: string | undefined,
    stateId: string | undefined,
    clientNumber: string | undefined,
    clientId: string | undefined

}

export class GetClientsRequest{
    clientName : string
    clientNumber: string
    stateId: string
    status: string
    constructor(){
        this.clientName = '',
        this.clientNumber = '',
        this.stateId = '',
        this.status = ''
    }
}

export class ClientInformation{
    clientId: string | undefined
    clientCompany: string | undefined
    clientAddress: string | undefined
    clientCity: string | undefined
    clientStateId: string | undefined
    clientZipCode: string | undefined
    clientContactName:string | undefined
    contactTitle: string | undefined
    clientContactPhone: string | undefined
    clientContactEmail: string | undefined
    clientBillingContact: string | undefined
    secondaryContactTitle: string | undefined
    clientBillingPhone: string | undefined
    clientBillingEmail: string | undefined
    csalemodel: cSaleModel | undefined
    activationDate: string | undefined
    cancellationDate: string | undefined
    loanno: string | undefined
    comments: string | undefined
    listOfBranch: ListOfBranch[] | undefined
    constructor(){}
}

export interface ListOfBranch{
    branchmasterId : string | undefined,
    clientbranchId : string | undefined
}

export interface cSaleModel{
    clientsalespersonId: string | undefined,
    clientId : string | undefined,
    name: string | undefined,
    phoneNumber: string | undefined,
    email: string | undefined,
    clientSalesRepName: string | undefined,
    clientSalesRepphoneNum: string | undefined,
    clientSalesRepEmail: string | undefined,
    createdBy: string | undefined,
    modifiedBy: string | undefined
}

export interface GetClientInformationRequest{
    clientId : string,
    userId : string,
    processId : string | undefined
}

export class Legal{
    legalmasterId: string | undefined
    clientId: string | undefined
    sowreceived: string | undefined
    slareceived: string | undefined
    lengthofagyear: string | undefined
    cancellationDate: string | undefined
    slareceivedDate: string | undefined
    sowreceivedDate: string | undefined
    renewalDate: string | undefined
    modifiedBy: string | undefined
    multipartFiles: Array<string> | undefined
}

export interface DocumentModel{
    clientId : string | undefined,
    filelocation : string | undefined,
    documentId : string | undefined
}

export class Billing{
    clientId : string | undefined
    clientBillingMasterId : string | undefined
    billingContactName : string | undefined
    billingContactTitle:string | undefined
    billingContactEmail:string | undefined
    billingContactPhoneNo:string | undefined
    billingContactAddress:string | undefined
    city:string | undefined
    stateid:string | undefined
    zip:string | undefined
    sbillingContactName:string | undefined
    sbillingContactTitle:string | undefined
    sbillingContactEmail:string | undefined
    sbillingContactPhoneno:string | undefined
    sbillingContactAddress:string | undefined
    sCity:string | undefined
    sstateId:string | undefined
    sZip:string | undefined
    billingFrequency:string | undefined
    invoiceFormat:string | undefined
    model:string | undefined
    email:string | undefined
    commentAndNotes:string | undefined
    lastupdatedBy: string | undefined
    lastupdateddate:string | undefined
    constructor(){}
}

export class ProductPricing{
    clientId: string | undefined
    serviceId: string | undefined
    comments: string | undefined
    clientProductPricingId: string | undefined
    periodic: string | undefined
    insurance: string | undefined
    escrowanalyze: string | undefined
    refinance: string | undefined
    pinsurance: string | undefined
    loanTerm: string | undefined
    prefinance: string | undefined
    flatFee: string | undefined
    lifeofLoan: string | undefined
    delinquentTaxSearch: string | undefined
    delinquentLetterServiceFee:string | undefined
    ppaymentProcessing: string | undefined
    pdeliquenttaxSearch: string | undefined
    paymentprocessingClient: string | undefined
    paymentProcessingFee:string | undefined
    pdelinquentLetterService: string | undefined
    pescrowanalyze: string | undefined

}

export class BankDetails{
    clientBankDetlsId:string | undefined
    clientId:string | undefined
    bankClientContactPerson:string | undefined
    bankContactAddress:string | undefined
    city:string | undefined
    stateId:string | undefined
    bankClientContactPhone:string | undefined
    bankContact:string | undefined
    bankClientContactEmail:string | undefined
    zip:string | undefined
    testCheckRequired:string | undefined
    countOfTestCheck:string | undefined
    testCheckSubDate:string | undefined
    testCheckAppBy:string | undefined	
    testCheckAppDate:string | undefined
    firstCheckNumber:string | undefined
    accountOwnership:string | undefined
    reconilazation:string | undefined
    clientLogoRequired:string | undefined
    signatureCard:string | undefined
    posspayFileRecevied:string | undefined
    clientBankData : string | undefined
    logoFileLocation : Array<string> | undefined
    signatureCardLocation : Array<string> | undefined
    possPayFileReceLoc : Array<string> | undefined
    constructor(){}
}

export interface ClientState{
    clients : Array<Client>;
    clientInformation : ClientInformation,
    legalDetails : Legal,
    billingDetails : Billing,
    productPricingDetails : ProductPricing,
    bankDetails : BankDetails
    actionInProgress: boolean;
    error: any;
}

export interface State extends AppState {
    client : ClientState;
}