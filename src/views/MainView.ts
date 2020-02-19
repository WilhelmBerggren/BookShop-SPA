import BookView from './BookView';
import FormView from './FormView';
import LogBoxView from './LogBoxView';
import KeyView from './KeyView';
import MainModel from '../models/MainModel';

export default class MainView {
    model: MainModel;
    bookView: BookView;
    formView: FormView;
    logBoxView: LogBoxView;
    keyView: KeyView;
    constructor(model: MainModel) {
        this.model = model;
        this.bookView = new BookView(model.bookModel);
        this.formView = new FormView(model.formModel);
        this.logBoxView = new LogBoxView(model.logBoxModel);
        this.keyView = new KeyView(model.keyModel);
    }

    async display() {
        return /*html*/`
            <section class="card">
                <div id="book-form-container">
                    ${await this.formView.display()}
                </div>
            </section>
            <section class="cards">
                <div class="card" id="log-box">
                    ${await this.logBoxView.display()}
                </div>
                <div class="card" id="key">
                    ${await this.keyView.display()}
                </div>
            </section>
            <section id="books" class="cards">
                ${await this.bookView.display()}
            </section>
        `
    }
}