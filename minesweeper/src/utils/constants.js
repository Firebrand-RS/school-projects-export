export const ThemeValues = {
  LIGHT: 'light',
  DARK: 'dark',
};

export const SIZE_VARIANTS = [10, 15, 25];

export const WIN_SIGN = 'win';
export const LOSE_SIGN = 'lose';
export const WIN_TEXT = 'Hooray! You found all mines in ## seconds and #N moves!';
export const LOSE_TEXT = 'Game over. Try again';

/* eslint-disable prettier/prettier */
export const neighbourLocationMap = [
  [-1, -1], [-1, +0], [-1, +1],
  [+0, -1], /*    */  [+0, +1],
  [+1, -1], [+1, +0], [+1, +1],
];
/* eslint-enable prettier/prettier */
