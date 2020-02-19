import FormModel from '../models/FormModel';

export default class FormView {
    model: FormModel;
    constructor(model: FormModel) {
        this.model = model;
    }

    async display() {
        return /*html*/`
            <h1> Form </h1>
            <form id="bookForm" class="card">
            <div class="row">
                <h3> Action </h3>
                <select name="op" id="op">
                    <option value="insert" ${this.model.op =="insert" ? 'selected' : ''}>Insert</option>
                    <option value="update" ${this.model.op =="update" ? 'selected' : ''}>Update</option>
                    <option value="delete" ${this.model.op =="delete" ? 'selected' : ''}>Delete</option>
                </select>
            </div>
            ${(this.model.op == "update") || (this.model.op == "delete") ? /*html*/`
                <div class="row" id="id-row">
                    <h3> ID </h3>
                    <input id="id" type="text" name="id" placeholder="id" value="${this.model.id}">
                </div>
            ` : ''}
            ${(this.model.op == "insert") || (this.model.op == "update") ? /*html*/`
                <div class="row" id="author-row">
                    <h3> Author </h3>
                    <input id="author" type="text" name="author" placeholder="author" value="${this.model.author}">
                </div>
                <div class="row" id="title-row">
                    <h3> Title </h3>
                    <input id="title" type="text" name="title" placeholder="title" value="${this.model.title}">
                </div>
            ` : ''}
            <div class="row">
                <h3> Submit </h3>
                <input type="submit">
            </div>
        </form>
        `
    }
}