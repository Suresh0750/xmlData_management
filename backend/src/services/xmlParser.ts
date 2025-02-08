import xml2js from 'xml2js';
import { IReport } from '../types/report.interface';


export async function parseXML(xmlData: string): Promise<IReport> {
  try {
    const parser = new xml2js.Parser({ explicitArray: false });
    const result = await parser.parseStringPromise(xmlData);
    
    const inProfileResponse = result.INProfileResponse;
    const currentApplicantDetails = inProfileResponse.Current_Application.Current_Application_Details.Current_Applicant_Details;
    const caisAccountDetails = inProfileResponse.CAIS_Account.CAIS_Account_DETAILS;
    
    //* Ensure caisAccountDetails is always an array
    const accountsArray = Array.isArray(caisAccountDetails) ? caisAccountDetails : [caisAccountDetails];
    
    const basicDetails = {
      name: `${currentApplicantDetails.First_Name} ${currentApplicantDetails.Last_Name}`,
      mobilePhone: currentApplicantDetails.MobilePhoneNumber,
      pan: accountsArray[0].CAIS_Holder_Details.Income_TAX_PAN || '',
      creditScore: parseInt(inProfileResponse.SCORE.BureauScore),
    };

    const reportSummary = {
      totalAccounts: parseInt(inProfileResponse.CAIS_Account.CAIS_Summary.Credit_Account.CreditAccountTotal),
      activeAccounts: parseInt(inProfileResponse.CAIS_Account.CAIS_Summary.Credit_Account.CreditAccountActive),
      closedAccounts: parseInt(inProfileResponse.CAIS_Account.CAIS_Summary.Credit_Account.CreditAccountClosed),
      currentBalanceAmount: parseFloat(inProfileResponse.CAIS_Account.CAIS_Summary.Total_Outstanding_Balance.Outstanding_Balance_All),
      securedAccountsAmount: parseFloat(inProfileResponse.CAIS_Account.CAIS_Summary.Total_Outstanding_Balance.Outstanding_Balance_Secured),
      unsecuredAccountsAmount: parseFloat(inProfileResponse.CAIS_Account.CAIS_Summary.Total_Outstanding_Balance.Outstanding_Balance_UnSecured),
      last7DaysCreditEnquiries: parseInt(inProfileResponse.TotalCAPS_Summary.TotalCAPSLast7Days),
    };

    const creditAccountsInformation = accountsArray.map(account => ({
      type: account.Account_Type,
      bank: account.Subscriber_Name.trim(),
      address: account.CAIS_Holder_Address_Details.First_Line_Of_Address_non_normalized,
      accountNumber: account.Account_Number,
      amountOverdue: parseFloat(account.Amount_Past_Due),
      currentBalance: parseFloat(account.Current_Balance),
    }));

    return {
      basicDetails,
      reportSummary,
      creditAccountsInformation,
    };
  } catch (error) {
    console.error('Error parsing XML:', error);
    throw new Error('Failed to parse XML data');
  }
}
