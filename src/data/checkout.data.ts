export interface CustomerInfo {
  firstName: string;
  lastName: string;
  postalCode: string;
}

export const generateCustomerInfo = (overrides?: Partial<CustomerInfo>): CustomerInfo => ({
  firstName: 'Jeffer',
  lastName: 'Castro',
  postalCode: '110111',
  ...overrides,
});

export const TEST_USERS = {
  standard: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
  locked: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },
  invalid: {
    username: 'invalid_user',
    password: 'wrong_password',
  },
} as const;

export const PRODUCTS = {
  backpack: 'Sauce Labs Backpack',
  bikeLight: 'Sauce Labs Bike Light',
  boltShirt: 'Sauce Labs Bolt T-Shirt',
} as const;
