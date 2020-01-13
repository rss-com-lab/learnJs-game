import React from 'react';

import {storiesOf} from '@storybook/react';
import {linkTo} from '@storybook/addon-links';
import {MemoryRouter} from 'react-router';

import Game from '../components/game-v.0.1/game/game';

import {Welcome} from '@storybook/react/demo';

storiesOf('Welcome', module).add('to Storybook', () => (
  <Welcome showApp={linkTo('Button')} />
));

storiesOf('Game', module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('game', () => <Game />);
