import { h, render } from "preact";

const ROOT_ELEMENT = document.querySelector('#app') as HTMLElement;

render(<h1>Hello world.</h1>, ROOT_ELEMENT);