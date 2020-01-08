export interface Theme {
  name: string,
  properties: {
    '--background-default': string,
    '--font-color': string
  }
}

export const light: Theme = {
  name: 'light',
  properties: {
    '--background-default': 'red',
    '--font-color': 'white'
  }
}

export const dark: Theme = {
  name: 'dark',
  properties: {
    '--background-default': 'black',
    '--font-color': 'white'
  }
}
