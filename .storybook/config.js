import { configure } from '@storybook/react';
import { configureViewport } from '@storybook/addon-viewport';

function loadStories() {
  require('../src/stories');
}

configure(loadStories, module);
