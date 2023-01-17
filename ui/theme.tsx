export const primitives = {
  primaryFontFamily: '"Open Sans", sans-serif',
  accent: 'rgb(133, 181, 21)',
  typography: {
    HeadingDefaults: {
      fontFamily: 'OpenSansBold, Gadget, sans-serif',
      fontWeight: '400',
    },
  },
}

export const overrides = {
  grid: {
    margins: [0, 0, 0],
    maxWidth: 6000,
  },
  typography: {
    //h1
    HeadingXXLarge: {
      ...primitives.typography.HeadingDefaults,
    },
    //h2
    HeadingXLarge: {
      ...primitives.typography.HeadingDefaults,
    },
    //h3
    HeadingLarge: {
      ...primitives.typography.HeadingDefaults,
    },
    //h4
    HeadingMedium: {
      ...primitives.typography.HeadingDefaults,
    },
    //h5
    HeadingSmall: {
      ...primitives.typography.HeadingDefaults,
    },
    //h6
    HeadingXSmall: {
      ...primitives.typography.HeadingDefaults,
    },
  },
}
