import {
  defaultColor,
  defaultDirection,
  defaultLocale,
  localeOptions,
  themeColorStorageKey,
  themeRadiusStorageKey,
} from 'constants/defaultValues';

const baseURL = `${process.env.REACT_APP_NODE_SERVER_API_BASE_URL}`;

export const mapOrder = (array, order, key) => {
  // eslint-disable-next-line func-names
  array.sort(function (a, b) {
    const A = a[key];
    const B = b[key];
    if (order.indexOf(`${A}`) > order.indexOf(`${B}`)) {
      return 1;
    }
    return -1;
  });
  return array;
};

export const getDateWithFormat = () => {
  const today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; // January is 0!

  const yyyy = today.getFullYear();
  if (dd < 10) {
    dd = `0${dd}`;
  }
  if (mm < 10) {
    mm = `0${mm}`;
  }
  return `${dd}.${mm}.${yyyy}`;
};

export const getCurrentTime = () => {
  const now = new Date();
  return `${now.getHours()}:${now.getMinutes()}`;
};

export const generateImageUrl = (url) => {
  return `${baseURL}/${url}`;
};

export const getDirection = () => {
  let direction = defaultDirection;

  try {
    if (localStorage.getItem('direction')) {
      const localValue = localStorage.getItem('direction');
      if (localValue === 'rtl' || localValue === 'ltr') {
        direction = localValue;
      }
    }
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js : getDirection -> error', error);
    direction = defaultDirection;
  }
  return {
    direction,
    isRtl: direction === 'rtl',
  };
};
export const setDirection = (localValue) => {
  let direction = 'ltr';
  if (localValue === 'rtl' || localValue === 'ltr') {
    direction = localValue;
  }
  try {
    localStorage.setItem('direction', direction);
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js : setDirection -> error', error);
  }
};

export const getCurrentColor = () => {
  let currentColor = defaultColor;
  try {
    if (localStorage.getItem(themeColorStorageKey)) {
      currentColor = localStorage.getItem(themeColorStorageKey);
    }
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js : getCurrentColor -> error', error);
    currentColor = defaultColor;
  }
  return currentColor;
};

export const setCurrentColor = (color) => {
  try {
    localStorage.setItem(themeColorStorageKey, color);
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js : setCurrentColor -> error', error);
  }
};

export const getCurrentRadius = () => {
  let currentRadius = 'rounded';
  try {
    if (localStorage.getItem(themeRadiusStorageKey)) {
      currentRadius = localStorage.getItem(themeRadiusStorageKey);
    }
  } catch (error) {
    console.log(
      '>>>>: src/helpers/Utils.js : getCurrentRadius -> error',
      error
    );
    currentRadius = 'rounded';
  }
  return currentRadius;
};

// Create our number formatter.
export const formatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  // maximumFractionDigits: 0
  // These options are needed to round to whole numbers if that's what you want.
});

export const formatDate = (inputDate, onlyDate) => {
  const date = new Date(inputDate);
  let formattedDate = date.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  if (onlyDate) {
    formattedDate = date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }

  // Manually capitalize "AM" or "PM"
  const capitalizedDate = formattedDate.replace(/\b(am|pm)\b/g, (match) =>
    match.toUpperCase()
  );

  return capitalizedDate;
};

export const getFullDateConvert = (utcDate, format) => {
  const tempdate = new Date(utcDate);
  const date = String(tempdate.getDate()).padStart(2, '0');
  const monthName = tempdate.toLocaleString('en-US', { month: 'short' });
  const hours = String(tempdate.getHours()).padStart(2, '0');
  const minutes = String(tempdate.getMinutes()).padStart(2, '0');
  const FullDate = `${date} ${monthName} ${tempdate.getFullYear()} | ${hours}:${minutes}`;
  const FormatedDate = `${date} ${monthName} ${tempdate.getFullYear()}`;
  if (format) return FormatedDate;
  return FullDate;
};


export const setCurrentRadius = (radius) => {
  try {
    localStorage.setItem(themeRadiusStorageKey, radius);
  } catch (error) {
    console.log(
      '>>>>: src/helpers/Utils.js : setCurrentRadius -> error',
      error
    );
  }
};

export const getCurrentLanguage = () => {
  let language = defaultLocale;
  try {
    language =
      localStorage.getItem('currentLanguage') &&
      localeOptions.filter(
        (x) => x.id === localStorage.getItem('currentLanguage')
      ).length > 0
        ? localStorage.getItem('currentLanguage')
        : defaultLocale;
  } catch (error) {
    console.log(
      '>>>>: src/helpers/Utils.js : getCurrentLanguage -> error',
      error
    );
    language = defaultLocale;
  }
  return language;
};
export const setCurrentLanguage = (locale) => {
  try {
    localStorage.setItem('currentLanguage', locale);
  } catch (error) {
    console.log(
      '>>>>: src/helpers/Utils.js : setCurrentLanguage -> error',
      error
    );
  }
};

export const getCurrentUser = () => {
  let user = null;
  try {
    user =
      localStorage.getItem('gogo_current_user') != null
        ? JSON.parse(localStorage.getItem('gogo_current_user'))
        : null;
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js  : getCurrentUser -> error', error);
    user = null;
  }
  return user;
};

export const setCurrentUser = (user) => {
  try {
    if (user) {
      localStorage.setItem('gogo_current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('gogo_current_user');
    }
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js : setCurrentUser -> error', error);
  }
};

export const setPermission = (permission) => {
  try {
    if (permission) {
      localStorage.setItem('permission', JSON.stringify(permission));
    } else {
      localStorage.removeItem('permission');
    }
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js : setPermission -> error', error);
  }
};

export const getPermission = () => {
  let permission = null;
  try {
    permission =
      localStorage.getItem('permission') != null
        ? JSON.parse(localStorage.getItem('permission'))
        : null;
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js  : getPermission -> error', error);
    permission = null;
  }
  return permission.permission;
};

export const getFullDate = (utcDate, format) => {
  const tempdate = new Date(utcDate);
  const date = String(tempdate.getDate()).padStart(2, '0');
  const month = String(tempdate.getMonth() + 1).padStart(2, '0');
  const hours = String(tempdate.getHours()).padStart(2, '0');
  const seconds = String(tempdate.getSeconds()).padStart(2, '0');
  const minutes = String(tempdate.getMinutes()).padStart(2, '0');
  const FullDate = `${date}-${month}-${tempdate.getFullYear()} | ${hours}:${minutes}:${seconds}`;
  const FormatedDate = `${date}-${month}-${tempdate.getFullYear()}`;
  if (format) return FormatedDate;
  return FullDate;
};

export const formatWalletAddress = (address) => {
  const firstFour = address?.slice(0, 4);
  const lastFour = address?.slice(-4);
  const middle = '...'; // You can customize the middle part as needed
  return `${firstFour}${middle}${lastFour}`;
};

export const convertToDropdownData = (data, label, value) =>
  data?.map((item) => ({
    label: item[label],
    value: item[value],
  }));

export const findByValue = (array, valueToFind) => {
  return array.find((obj) => obj.value === valueToFind);
};

export const getAdjustedURL = (url) => {
  if (url.includes('/v2')) {
    return {
      baseURL: `${process.env.REACT_APP_NODE_SERVER_API_BASE_URL}/v2`,
      url: url.replace('/v2', ''),
    };
  }
  return {
    baseURL: `${process.env.REACT_APP_NODE_SERVER_API_BASE_URL}/v1`,
    url,
  };
};

export const displayWalletAddress = (address, offset) =>
  `${address?.substring(0, offset)}...${address?.substring(
    address.length - offset
  )}`;

/**
 * Helper function that Copies the text to clipboard
 * @param {string} text
 */
export const copyToClipboard = (text) => {
  try {
    navigator.clipboard.writeText(text);
  } catch (error) {
    console.log(error);
  }
};
