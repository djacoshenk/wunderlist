import '@testing-library/jest-dom/extend-expect';
import 'jest-axe/extend-expect';

const mockedGeolocation = {
  getCurrentPosition: jest.fn().mockImplementation((success) =>
    Promise.resolve(
      success({
        coords: {
          latitude: 46.378333,
          longitude: 13.836667,
        },
      })
    )
  ),
};

global.navigator.geolocation = mockedGeolocation;
