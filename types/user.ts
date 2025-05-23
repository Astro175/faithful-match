export type User = {
  clerkId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  accessToken?: string;
  refreshToken?: string;
  provider?: string;
  otp?: string;
  subscriptionType?: string;
  lastSeen?: Date;
  isDeleted: boolean;
  deletedAt: Date; 
};
