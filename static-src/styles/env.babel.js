//  Root font size
const rootFontSize = {
  '--root-font-size': 12,
  '--root-font-size-desktop-hd': 16,
};

//  Width of the section content area
const contentAreaWidth = {
  '--content-area-width': '100%',
  '--content-area-width-tablet': 8.5 * rootFontSize['--root-font-size'],
  '--content-area-width-desktop-hd': 8.5 * rootFontSize['--root-font-size-desktop-hd'],
};

//  Width of sidebar
const desktopSidebarWidth = {
  '--sidebar-width': 300,
};

//  Width of gutter between sidebar and content area
const desktopSidebarGutterWidth = {
  '--sidebar-gutter-width': 12,
};

//  Minimum margin between the container and the browser window
const minContainerMargin = {
  '--min-container-margin': 18,
  '--min-container-margin-tablet': 36,
  '--min-container-margin-desktop': 72,
};

//  Width of a standard .container element, defined as the contentAreaWidth
//  plus the width and gutter of the sidebar, if applicable
const containerWidth = {
  '--container-width': `calc(${contentAreaWidth['--content-area-width']} - ${minContainerMargin['--min-container-margin']}px)`,
  '--container-width-tablet': contentAreaWidth['--content-area-width-tablet'],
  '--container-width-desktop':
    contentAreaWidth['--content-area-width-desktop']
    + desktopSidebarWidth['--sidebar-width']
    + desktopSidebarGutterWidth['--sidebar-gutter-width'],
  '--container-width-desktop-hd':
    contentAreaWidth['--content-area-width-desktop-hd']
    + desktopSidebarWidth['--sidebar-width']
    + desktopSidebarGutterWidth['--sidebar-gutter-width'],
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
  '--breakpoint-desktop-hd':
    containerWidth['--container-width-desktop-hd']
    + 2 * minContainerMargin['--min-container-margin-desktop'],
};

//  Export constants as environmental variables
export const environmentVariables = Object.assign({}, ...Object.entries({
  ...rootFontSize,
  ...contentAreaWidth,
  ...desktopSidebarWidth,
  ...desktopSidebarGutterWidth,
  ...containerWidth,
  ...minContainerMargin,
  ...breakpoints,
}).map(([property, value]) => ({ [property]: typeof value === 'number' ? `${value}px` : value })));

//  Export custom media queries
export const customMedia = {
  '--mobile': '(min-width: 0)',
  '--tablet': `(min-width: ${breakpoints['--breakpoint-tablet']}px)`,
  '--desktop': `(min-width: ${breakpoints['--breakpoint-desktop']}px)`,
  '--desktop-hd': `(min-width: ${breakpoints['--breakpoint-desktop-hd']}px)`,
};
