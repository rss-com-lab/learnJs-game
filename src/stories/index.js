import React from 'react';

import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';

import Loading from '../components/loading/loading';
import Game from '../components/game-v.0.1/game';

import {Button, Welcome} from '@storybook/react/demo';

storiesOf('Welcome', module).add('to Storybook', () => (
  <Welcome showApp={linkTo('Button')} />
));

storiesOf('Button', module).add('loading', () => <Loading />);
storiesOf('Game', module).add('game', () => <Game />);
