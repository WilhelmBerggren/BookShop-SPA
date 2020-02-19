import MainModel from './models/MainModel';
import MainView from './views/MainView';
import MainController from './controllers/MainController';

let model = new MainModel();
let view = new MainView(model);
let controller = new MainController(model, view);