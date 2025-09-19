export interface Profile {
  id: number;
  customerId: string;
  username: string;
  name: string;
  email: string;
  avatar: string;
  lastLogin: null;
  role: string;
  subscriptions: string;
  stripeCustomerId: null;
  forgotPassword: null;
  subscriptionEntities: SubscriptionEntities;
  authorities: Authority[];
  enabled: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  accountNonExpired: boolean;
}

export interface Authority {
  authority: string;
}

export interface SubscriptionEntities {
  id: number;
  stripeSubscriptionId: null;
  priceId: null;
  startDate: null;
  endDate: null;
  currentPeriodEnd: null;
}
