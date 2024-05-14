import { ButtonProps, createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    link: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    link?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    link: true;
  }
}

declare module '@mui/material/styles' {
  interface PaletteColor {
    xdark?: string;
    xlight?: string;
  }

  interface SimplePaletteColorOptions {
    xdark?: string;
    xlight?: string;
  }
}

declare module '@mui/material/styles' {
  interface Palette {
    neutralDark: {
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
  }

  interface PaletteOptions {
    neutralDark?: {
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
  }
}

const baseTheme = createTheme({
  typography: {
    fontFamily: 'DM Sans, sans-serif',
    h1: {
      fontSize: '96px',
      fontWeight: 400,
      lineHeight: '116%',
    },
    h2: {
      fontSize: '60px',
      fontWeight: 400,
      lineHeight: '120%',
    },
    h3: {
      fontSize: '48px',
      fontWeight: 400,
      lineHeight: '116%',
    },
    h4: {
      fontSize: '34px',
      fontWeight: 400,
      lineHeight: '123%',
    },
    h5: {
      fontSize: '24px',
      fontWeight: 400,
      lineHeight: '130%',
    },
    h6: {
      fontSize: '20px',
      fontWeight: 400,
      lineHeight: '130%',
    },
    caption: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '160%',
    },
    overline: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '260%',
      textTransform: 'uppercase',
    },
    subtitle1: {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '175%',
    },
    subtitle2: {
      fontSize: '14px',
      fontWeight: 600,
      lineHeight: '150%',
    },
    body1: {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '150%',
    },
    body2: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '143%',
    },
    link: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '165%',
      textDecoration: 'underline',
      fontFamily: 'DM Sans, serif',
    },
  },
  palette: {
    primary: {
      main: '#5D04D9',
      light: '#B582FD',
      dark: '#2D046B',
      xlight: '#D3B4FE',
      xdark: '#36027D',
    },
    secondary: {
      main: '#058FF2',
      light: '#9BD4FD',
      dark: '#0468AF',
      xlight: '#CDEAFE',
      xdark: '#034A7D',
    },
    background: {
      default: '#0468AF',
      paper: '#FFFFFF',
    },
    error: {
      main: '#E41313',
    },
    success: {
      main: '#11D48D',
    },
  },
});

const theme = createTheme(baseTheme, {
  palette: {
    neutralDark: baseTheme.palette.augmentColor({
      color: {
        100: '#030C4A',
        200: 'rgba(3, 12, 74, 0.85)',
        300: 'rgba(3, 12, 74, 0.75)',
        400: 'rgba(3, 12, 74, 0.60)',
        500: 'rgba(3, 12, 74, 0.50)',
        600: 'rgba(3, 12, 74, 0.30)',
        700: 'rgba(3, 12, 74, 0.20)',
        800: 'rgba(3, 12, 74, 0.15)',
        900: 'rgba(3, 12, 74, 0.07)',
      },
      name: 'neutralDark',
    }),
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: ({ ownerState }: { ownerState: ButtonProps }) => {
          return {
            padding: '0.5rem 1.2rem',
            boxShadow: 'none',
            textTransform: 'inherit',
            borderRadius: '8px',
            backgroundColor:
              ownerState.variant === 'contained'
                ? baseTheme.palette &&
                  baseTheme.palette[
                    ownerState.color as
                      | 'primary'
                      | 'secondary'
                      | 'error'
                      | 'success'
                      | 'info'
                      | 'warning'
                  ].main
                : ownerState.variant === 'text'
                ? baseTheme.palette &&
                  baseTheme.palette[
                    ownerState.color as
                      | 'primary'
                      | 'secondary'
                      | 'error'
                      | 'success'
                      | 'info'
                      | 'warning'
                  ].xlight
                : 'transparent',
            '&:hover': {
              backgroundColor:
                ownerState.variant === 'contained'
                  ? baseTheme.palette &&
                    baseTheme.palette[
                      ownerState.color as
                        | 'primary'
                        | 'secondary'
                        | 'error'
                        | 'success'
                        | 'info'
                        | 'warning'
                    ].dark
                  : ownerState.variant === 'text'
                  ? baseTheme.palette &&
                    baseTheme.palette[
                      ownerState.color as
                        | 'primary'
                        | 'secondary'
                        | 'error'
                        | 'success'
                        | 'info'
                        | 'warning'
                    ].light
                  : ownerState.variant === 'outlined'
                  ? baseTheme.palette &&
                    baseTheme.palette[
                      ownerState.color as
                        | 'primary'
                        | 'secondary'
                        | 'error'
                        | 'success'
                        | 'info'
                        | 'warning'
                    ].xlight
                  : 'transparent',
              color:
                ownerState.variant === 'text' &&
                baseTheme.palette &&
                baseTheme.palette[
                  ownerState.color as
                    | 'primary'
                    | 'secondary'
                    | 'error'
                    | 'success'
                    | 'info'
                    | 'warning'
                ].xdark,
              boxShadow: 'none',
            },
          };
        },
        sizeSmall: {
          padding: '10px 25px',
          fontSize: '14px',
          fontWeight: 'bold',
        },
        sizeMedium: {
          padding: '10px 25px',
          fontSize: '14px',
          fontWeight: 'bold',
        },
        sizeLarge: {
          padding: '10px 25px',
          fontSize: '14px',
          fontWeight: 'bold',
        },
        MuiOutlinedInput: {
          styleOverrides: {
            root: {
              input: { padding: '10px !important' },
            },
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: baseTheme.palette && baseTheme.palette?.primary.main,
          fontWeight: 500,
          height: 44,
          background: baseTheme.palette?.background.paper,
          borderRadius: 15 + 'px !important',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#DFE4F2 !important',
            borderRadius: 15,
          },
          '&:hover': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: baseTheme.palette?.primary.main + ' !important',
            },
          },
          '&.Mui-disabled input': {
            WebkitTextFillColor: '#DFE4F2',
          },
          '&.Mui-disabled': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: baseTheme.palette?.grey[800] + '!important',
            },
          },
          '&.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: baseTheme.palette?.primary.main + ' !important',
            },
            '& .MuiSvgIcon-root': {
              color: baseTheme.palette?.primary.main + ' !important',
            },
          },
          '& .MuiInputAdornment-root': {
            '& .MuiSvgIcon-root': {
              color: baseTheme.palette?.grey[500],
            },
          },
        },
      },
    },
  },
});

export default theme;
