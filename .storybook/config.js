import { configure } from '@storybook/react'
import { configureViewport } from '@storybook/addon-viewport'
import '@storybook/addon-console'

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /(.)?stories.js$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)

configureViewport({
  viewports: {
    responsive: {
      name: 'Responsive',
      styles: {
        width: '100%',
        height: '100%'
      }
    },
    iphone8: {
      name: 'Iphone8',
      styles: {
        width: '375px',
        height: '670px'
      }
    }
  }
})

configureViewport({
  defaultViewport: 'responsive'
})
