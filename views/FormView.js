export default class FormView {
    constructor(model) {
        this.model = model;
    }

    async display() {
        document.querySelector('#book-form-container').innerHTML = /*html*/`
            <h1> Form </h1>
            <form id="bookForm" class="card">
            <div class="row">
                <h3> Action </h3>
                <select name="op" id="op">
                    <option value="insert" ${this.model.params.op =="insert" ? 'selected' : ''}>Insert</option>
                    <option value="update" ${this.model.params.op =="update" ? 'selected' : ''}>Update</option>
                    <option value="delete" ${this.model.params.op =="delete" ? 'selected' : ''}>Delete</option>
                </select>
            </div>
            ${(this.model.params.op == "update") || (this.model.params.op == "delete") ? /*html*/`
                <div class="row" id="id-row">
                    <h3> ID </h3>
                    <input id="id" type="text" name="id" placeholder="id" value="${this.model.params.id}">
                </div>
            ` : ''}
            ${(this.model.params.op == "insert") || (this.model.params.op == "update") ? /*html*/`
                <div class="row" id="author-row">
                    <h3> Author </h3>
                    <input id="author" type="text" name="author" placeholder="author" value="${this.model.params.author}">
                </div>
                <div class="row" id="title-row">
                    <h3> Title </h3>
                    <input id="title" type="text" name="title" placeholder="title" value="${this.model.params.title}">
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