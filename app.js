import BookModel from '/models/BookModel.js';
import BookView from '/views/BookView.js';
import BookController from '/controllers/BookController.js';

import FormModel from '/models/FormModel.js';
import FormView from '/views/FormView.js';
import FormController from '/controllers/FormController.js';

let bookModel = new BookModel();
let bookView = new BookView(bookModel);
let bookController = new BookController(bookModel, bookView);

let formModel = new FormModel();
let formView = new FormView(formModel);
let formController = new FormController(formModel, formView);

/*
import MainModel from '/models/mainModel.js';
import MainView from '/views/mainView.js';
import MainController from '/controllers/mainController.js';

let model = new MainModel();
let view = new MainView(model);
let controller = new MainController(model, view);*/