import './assets/styles/global-styles.scss';
import './assets/fonts/Roboto-Regular.woff';
import { BaseComponent } from './components/base.component';
import { MinesweeperController } from './controllers/minesweeper.controller';

const pageWrapper = new BaseComponent({ className: 'page-wrapper' });
document.body.append(pageWrapper.getElement());

const minesweeperController = new MinesweeperController(pageWrapper);
minesweeperController.render();
