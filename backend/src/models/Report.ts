import mongoose, { model, Schema, Document } from 'mongoose';
import { IReport } from '../types/report.interface';

const BasicDetailsSchema = new Schema({
  name: { type: String, required: true },
  mobilePhone: { type: String, required: true, unique: true },
  pan: { type: String, required: true, unique: true },
  creditScore: { type: Number, required: true },
}, { _id: false });

const ReportSummarySchema = new Schema({
  totalAccounts: { type: Number, required: true },
  activeAccounts: { type: Number, required: true },
  closedAccounts: { type: Number, required: true },
  currentBalanceAmount: { type: Number, required: true },
  securedAccountsAmount: { type: Number, required: true },
  unsecuredAccountsAmount: { type: Number, required: true },
  last7DaysCreditEnquiries: { type: Number, required: true },
}, { _id: false });

const CreditAccountSchema = new Schema({
  type: { type: String, required: true },
  bank: { type: String, required: true },
  address: { type: String, required: true },
  accountNumber: { type: String, required: true, unique: true },
  amountOverdue: { type: Number, required: true },
  currentBalance: { type: Number, required: true },
}, { _id: false });

const ReportSchema: Schema = new Schema({
  basicDetails: { type: BasicDetailsSchema, required: true },
  reportSummary: { type: ReportSummarySchema, required: true },
  creditAccountsInformation: { type: [CreditAccountSchema], required: true },
}, { timestamps: true });

const Report = model<IReport & Document>('Report', ReportSchema, 'reports');

export default Report;
