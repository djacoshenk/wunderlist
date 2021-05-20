import { fakeRestaurantData } from '__tests__/fixtures/fakeRestaurantData';

export const fakeCurrentUserDataNoSavedPlaces: any = {
  email: 'daniel.jacoshenk@gmail.com',
  firstName: 'Danny',
  lastName: 'Jacoshenk',
  uid: 'iewLUuw7ZSaNilDpsTxmbvVO8T52',
  savedPlaces: [],
};

export const fakeCurrentUserDataWithSavedPlaces: any = {
  email: 'daniel.jacoshenk@gmail.com',
  firstName: 'Danny',
  lastName: 'Jacoshenk',
  uid: 'iewLUuw7ZSaNilDpsTxmbvVO8T52',
  savedPlaces: [fakeRestaurantData.data],
};
