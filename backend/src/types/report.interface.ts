export interface IReport {
    basicDetails: {
      name: string;
      mobilePhone: string;
      pan: string;
      creditScore: number;
    };
    reportSummary: {
      totalAccounts: number;
      activeAccounts: number;
      closedAccounts: number;
      currentBalanceAmount: number;
      securedAccountsAmount: number;
      unsecuredAccountsAmount: number;
      last7DaysCreditEnquiries: number;
    };
    creditAccountsInformation: Array<{
      type: string;
      bank: string;
      address: string;
      accountNumber: string;
      amountOverdue: number;
      currentBalance: number;
    }>;
  }