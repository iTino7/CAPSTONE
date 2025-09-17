export interface Wishlist {
  content: Content[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  sort: Sort;
  empty: boolean;
}

export interface Content {
  id: number;
  movieId: string;
  user: UserClass;
  title: string;
  poster: string;
}

export interface UserClass {
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
  credentialsNonExpired: boolean;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
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

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  unpaged: boolean;
  paged: boolean;
}

export interface Sort {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}
