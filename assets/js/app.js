/*========================================================*/
/*                                                        */
/*  Olisa Nweze (2024)                                    */
/*  github.com/olisanweze                                 */
/*                                                        */
/*=======================================================*/

'use strict';

import { listen, select, create } from "./utils.js";
import { Subscriber } from "./Subscriber.js";

/*=======================================================*/
/*  Global Variables                                     */
/*=======================================================*/

let groupsArray = [
  'chess club',
  'baking class', 
  'wine tasters', 
  'golf club'
];

let pagesArray = [
  'board games', 
  'cooking class',
  'speed racing'
];

const newSubscriber = new Subscriber(
  'Tamer', 'tm456', 'tamer@email.com', '44950D2E', pagesArray, groupsArray, true
);

const dialog = select('.dialog');
const profile = select('.profile');
const modal = select('.modal-background');
const post = select('.button');
const text = select('textarea');
const fileInput = select('#file-input');
const fileName = select('.file-name');
const platform = select('.platform');

/*=======================================================*/
/*  Functions                                            */
/*=======================================================*/

function setUserData() {
  let userData = newSubscriber.getInfo();
  let data = userData.split(', ');
  const [name, username, email, pages, groups, monetize] = data;
  let newPages = pages.split(',').join(', ');
  let newGroups = groups.split(',').join(', ');
  const newMonetize = monetize ? 'eligible' : 'not eligible';
  return {
    name: name,
    username: username,
    email: email,
    pages: newPages,
    groups: newGroups,
    monetization: newMonetize
  }
}

function populateModal() {
  let obj = setUserData();
  let heading = create('h3');
  heading.innerText = `user profile`;
  dialog.appendChild(heading);

  for (const prop in obj) {
    let box = create('div');
    let par = create('p');
    let span = create('span');
    span.innerText = prop;
    par.innerText = `${obj[prop]}`;
    [span, par].forEach(e => box.appendChild(e));
    dialog.appendChild(box);
  }
}

populateModal();

function getText() {
  return text.value.trim();
}

function getImage() {
  if (fileInput.files.length !== 0) {
    let file = fileInput.files[0];
    if (file.type.startsWith('image/')) {
      let img = create('img');
      img.src = URL.createObjectURL(file);
      return img;
    }
  }
}

function postHeaderContent() {
  let date = create('p');
  let name = create('h4');

  name.innerText = newSubscriber.name;
  date.innerText = new Date().toDateString();

  return [name, date];
}

function createHeader() {
  let header = create('div');
  let content = postHeaderContent();
  header.classList.add('flex');
  header.classList.add('space-between');

  let profile = create('div');
  profile.classList.add('profile');

  header.appendChild(profile);
  content.forEach(arg => {
    header.appendChild(arg);
  })

  return header;
}

function appendPost(container) {
  if (platform.children.length > 1) {
    platform.insertBefore(container, platform.children[1]);
  } else {
    platform.append(container);
  }
}

function postIsValid() {
  if (text.value !== "" || fileInput.files.length !== 0) {
    return true;
  }
}

function createPost() {
  if (postIsValid()) {
    let header = createHeader();
    let postContainer = create('div');
    let post = create('p');
    let img = getImage();

    post.innerText = getText();
    postContainer.appendChild(header);
    postContainer.appendChild(post);
    if (getImage()) { postContainer.appendChild(img); }

    appendPost(postContainer);
  }
}

function fileInputCheck() {
  let file = fileInput.files[0];

  if (file.type.startsWith('image/')) {
    fileName.innerText = `${fileInput.files[0].name}`;
  } else {
    fileName.innerText = `Choose a picture from device`;
  }
}

function postReset() {
  createPost();
  fileInput.value = null;
  fileName.innerText = '';
  text.value = '';
}

function showModal() {
  dialog.classList.remove('is-hidden');
  dialog.classList.add('is-visible');
  modal.classList.add('modal-bg-dark');
}

function hideModal(e) {
  if (e.target === modal) {
    dialog.classList.remove('is-visible');
    dialog.classList.add('is-hidden');
    modal.classList.remove('modal-bg-dark');
  }
}

/*=======================================================*/
/*  Event Listeners                                      */
/*=======================================================*/

listen('click', profile, showModal);
listen('click', window, hideModal);
listen('touchstart', window, hideModal);
listen('change', fileInput, fileInputCheck);
listen('click', post, postReset);