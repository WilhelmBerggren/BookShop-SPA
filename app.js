import MainModel from '/models/MainModel.mjs';
import MainView from '/views/MainView.mjs';
import MainController from '/controllers/MainController.mjs';

let model = new MainModel();
let view = new MainView(model);
let controller = new MainController(model, view);