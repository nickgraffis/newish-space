import { defineConfig } from 'windicss/helpers'
import filters from 'windicss/plugin/filters'
import animations from '@windicss/animations'
import typography from 'windicss/plugin/typography'

export default defineConfig({
  darkMode: 'class',
  // https://windicss.org/posts/v30.html#attributify-mode
  attributify: true,

  plugins: [
    typography({
      modifiers: ['sm', 'lg'],
    }),
    filters,
    animations({
      settings: {
        animatedSpeed: 800,
        heartBeatSpeed: 1000,
        hingeSpeed: 2000,
        bounceInSpeed: 750,
        bounceOutSpeed: 750,
        animationDelaySpeed: 1000,
      },
    }),
  ],
  theme: {
    extend: {
      typography: {
        sm: {
          css: {
            img: {
              marginTop: '0',
              marginBottom: '0',
            },
            maxWidth: '42rem',
            color: 'inherit',
            a: {
              'color': 'inherit',
              'opacity': 0.75,
              'fontWeight': '500',
              'textDecoration': 'underline',
              '&:hover': {
                opacity: 1,
                color: 'inherit',
              },
            },
            pre: {
              fontSize: '18px',
              padding: '0',
            },
            kbd: {
              fontFamily: 'Dank Mono',
              border: '2px solid var(--primary)',
              padding: '2px 10px',
              margin: '0.1rem',
              borderRadius: '0.2rem',
              textAlign: 'center',
            },
            b: { color: 'inherit' },
            strong: { color: 'inherit' },
            em: { color: 'inherit' },
            h1: { color: 'inherit' },
            h2: { color: 'inherit' },
            h3: { color: 'inherit' },
            h4: { color: 'inherit' },
            p: {
              fontSize: '18px',
            },
            code: { color: 'inherit' },
          },
        },
      },
      colors: {
        muted: 'var(--muted)',
        grass: 'var(--grass)',
        back: 'var(--back)',
        middle: 'var(--middle)',
        front: 'var(--front)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        tertiary: 'var(--tertiary)',
        corn: 'var(--corn)',
        rose: 'var(--rose)',
        dracula: '#9580FF',
        buffy: '#FF7AC6',
        vonCount: '#6272a4',
        cullen: '#f8f8f2',
        aro: '#44475a',
        nosferatu: '#22212C',
        morbius: '#ffb86c',
        blade: '#50fa7b',
        lincoln: '#f1fa8c',
        marcilin: '#ff5555',
        vanHelsing: '#8be9fd',
        nord: {
          0: 'var(--nord0)',
          1: 'var(--nord1)',
          2: 'var(--nord2)',
          3: 'var(--nord3)',
          4: 'var(--nord4)',
          5: 'var(--nord5)',
          6: 'var(--nord6)',
          7: 'var(--nord7)',
          8: 'var(--nord8)',
          9: 'var(--nord9)',
          10: 'var(--nord10)',
          11: 'var(--nord11)',
          12: 'var(--nord12)',
          13: 'var(--nord13)',
          14: 'var(--nord14)',
        },
        oxford: {
          // oxford
          DEFAULT: '#3E5166',
          50: '#B7C4D3',
          100: '#A7B7C9',
          200: '#879DB6',
          300: '#6784A3',
          400: '#516A86',
          500: '#3E5166',
          600: '#2B3846',
          700: '#171F27',
          800: '#040507',
          900: '#000000',
        },
        caribbean: {
          // caribbean-green
          DEFAULT: '#34D399',
          50: '#F1FCF8',
          100: '#DCF7ED',
          200: '#B2EED8',
          300: '#88E5C3',
          400: '#5EDCAE',
          500: '#34D399',
          600: '#26AE7C',
          700: '#1D845F',
          800: '#145A41',
          900: '#0B3023',
        },
        mango: {
          // mango-tango
          DEFAULT: '#FD813E',
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#FFE4D5',
          300: '#FEC3A3',
          400: '#FEA270',
          500: '#FD813E',
          600: '#FC600C',
          700: '#D34B02',
          800: '#A03902',
          900: '#6E2701',
        },
        maiz: {
          // maiz yellow
          DEFAULT: '#F0C64C',
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#FCF3D9',
          300: '#F8E4AA',
          400: '#F4D57B',
          500: '#F0C64C',
          600: '#ECB71D',
          700: '#C59711',
          800: '#96730D',
          900: '#674F09',
        },
      },
    },
  },
})
