//  Padding between "paper" page and the text it contains
const pagePadding = {
  '--page-padding': 18,
  '--page-padding-tablet': 72,
  '--page-padding-desktop': 72,
};

//  Width of "paper" page (outside of padding)
const pageWidth = {
  '--page-width': '100%',
  '--page-width-tablet': 612,
  '--page-width-desktop': 612,
};

//  Width of desktop sidebar and gutter between sidebar and page
const desktopElementWidth = {
  '--sidebar-width-desktop': 300,
  '--gutter-width-desktop': 12,
};

//  Width of the "paper" page plus desktop elements (if desktop)
const containerWidth = {
  '--container-width': pageWidth['--page-width'],
  '--container-width-tablet': pageWidth['--page-width-tablet'],
  '--container-width-desktop':
    pageWidth['--page-width-desktop']
    + desktopElementWidth['--sidebar-width-desktop']
    + desktopElementWidth['--gutter-width-desktop'],
};

//  Minimum margin between the container and the browser window
const minContainerMargin = {
  '--min-container-margin': '0',
  '--min-container-margin-tablet': 36,
  '--min-container-margin-desktop': 72,
};

//  Breakpoints
export const breakpoints = {
  '--breakpoint-mobile': 0,
  '--breakpoint-tablet':
    containerWidth['--container-width-tablet']
    + 2 * minContainerMargin['--min-container-margin-tablet'],
  '--breakpoint-desktop':
    containerWidth['--container-width-desktop']
    + 2 * minContainerMargin['--min-container-margin-desktop'],
};

//  Media queries
export const customMedia = {
  '--mobile': '(min-width: 0)',
  '--tablet': `(min-width: ${breakpoints['--breakpoint-tablet']}px)`,
  '--desktop': `(min-width: ${breakpoints['--breakpoint-desktop']}px)`,
};

export const environmentVariables = Object.assign({}, ...Object.entries({
  ...pagePadding,
  ...pageWidth,
  ...desktopElementWidth,
  ...containerWidth,
  ...minContainerMargin,
  ...breakpoints,
}).map(([property, value]) => ({ [property]: `${value}px` })));
