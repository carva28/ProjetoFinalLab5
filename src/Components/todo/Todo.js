import React, { Component } from 'react';
import './todo.css';

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.getRoutes = this.getRoutes.bind(this);
    this.onEnter = this.onEnter.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deleteRoute = this.deleteRoute.bind(this);
    this.drop = this.drop.bind(this);
  }
  dragStart(e) {
    e.dataTransfer.setData('index', e.target.getAttribute('data-index'));
  }
  dragEnter(e) {
    e.preventDefault();
    return true;
  }
  dragOver(e) {
    e.preventDefault();
  }
  drop(e) {
    if (
      e.target.getAttribute('data-index') !== e.dataTransfer.getData('index')
    ) {
      this.props.updateState('changePosition', [
        e.target.getAttribute('data-index'),
        e.dataTransfer.getData('index')
      ]);
    }
  }
  getRoutes() {
    return this.props.routes.map((route, index) => {
      return (
        <p
          key={index}
          className="route"
          data-index={index}
          draggable={true}
          onDragStart={this.dragStart}
          onDrop={this.drop}
          onDragOver={this.dragOver}
          onDragEnter={this.dragEnter}
        >
          {route} <span onClick={this.deleteRoute.bind(null, index)}>X</span>
        </p>
      );
    });
  }
  onEnter(e) {
    if (e.keyCode !== 13) return false;
    this.setState({ value: '' });
    this.props.updateState('addRoute', e.target.value);
  }
  deleteRoute(index) {
    this.props.updateState('deleteRoute', index);
  }
  handleChange(e) {
    this.setState({ value: e.target.value });
  }
  openRoutes(e) {
    var todoContainer = document.querySelector('.todo-container');
    todoContainer.classList.toggle('open');
  }
  render() {
    return (
      <div className="todo">
        <div onClick={this.openRoutes} className="hamburger">
          <span />
          <span />
          <span />
        </div>
        <div className="todo-container">
          <input 
            type="text"
            placeholder="Insira Novo Ponto"
            onKeyDown={this.onEnter}
            onChange={this.handleChange}
            value={this.state.value}
          />
          <div className="todo-block">{this.getRoutes()}</div>
        </div>
      </div>
    );
  }
}

export default Todo;