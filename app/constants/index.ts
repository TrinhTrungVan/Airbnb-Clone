export const COLORS = {
  main: '#FF385C',
  white: '#FFF',
  black: '#000',
  text: '#222222',
  textBlur: '#717171',
  gray: '#DDD',
  backgroundHover: '#F7F7F7',
  backdrop: 'rgba(0,0,0,0.6)',
  red: 'red',
}

export const SIZES = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2520px',
}

export const devices = {
  mobileS: `(min-width: ${SIZES.mobileS})`,
  mobileM: `(min-width: ${SIZES.mobileM})`,
  mobileL: `(min-width: ${SIZES.mobileL})`,
  tablet: `(min-width: ${SIZES.tablet})`,
  laptop: `(min-width: ${SIZES.laptop})`,
  laptopL: `(min-width: ${SIZES.laptopL})`,
  desktop: `(min-width: ${SIZES.desktop})`,
}
