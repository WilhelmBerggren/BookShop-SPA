import MainModel from './models/MainModel.js';
import MainView from './views/MainView.js';
import MainController from './controllers/MainController.js';

let model = new MainModel();
let view = new MainView(model);
let controller = new MainController(model, view);