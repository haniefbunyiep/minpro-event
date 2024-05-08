export interface ICreateUserServiceParams {
  name: string;
  email: string;
  username: string;
  password: string;
  referralCode: string;
  expireAt: string;
}

export interface ICreateVoucherAfterUseReferralParams {
  uid: string;
  expireAt: string;
  voucherCode: string;
}
export interface ICreateEOParams {
  name: string;
  // phoneNumber?: string;
  email: string;
  password: string;
}
