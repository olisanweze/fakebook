/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*                                                       */
/*  Olisa Nweze (2024)                                  */
/*  github.com/olisanweze                                  */
/*                                                       */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */

'use strict';

// This app requires a server to handle import statements and CORS issues
import { listen, select, create } from "./utils.js";
import { Subscriber } from "./User.js";


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*  Organizer                                            */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */

let groupsArray = [
  'chess club',
  'baking class', 
  'wine tasters', 
  'golf club'
];

let pagesArray = [
  'board games', 
  'cooking class',
  'exquisite hobbies'
];

const newSubscriber = new Subscriber(
  'Tamer', 'tm456', 'tamer@email.com', '44950D2E', pagesArray, groupsArray, true
);

// Modal
const dialog = select('.dialog');
const profile = select('.profile');
const modal = select('.modal-background');

function setUserData() {
  let userData = newSubscriber.getInfo();
  let data = userData.split(', ');
  const [name, username, email, pages, groups, monetize] = data;
  let newPages = pages.split(',').join(', ');
  let newGroups = groups.split(',').join(', ');
  const newMonetize = monetize ? 'eligible' : 'not eligible';
  return {
    Name: name,
    Username: username,
    Email: email,
    Pages: newPages,
    Groups: newGroups,
    Monetization: newMonetize
  }
}

function populateModal() {
  let obj = setUserData();
  let heading = create('h3');
  heading.innerText = `Profile`;
  dialog.appendChild(heading);

  for (const prop in obj) {
    let box = create('div');
    let parag = create('p');
    let span = create('span');
    span.innerText = prop;
    parag.innerText = `${obj[prop]}`;
    [span, parag].forEach(ele => box.appendChild(ele));
    dialog.appendChild(box);
  }
}

populateModal();

listen('click', profile, () => {
  dialog.classList.remove('is-hidden');
  dialog.classList.add('is-visible');
  modal.classList.add('modal-bg-dark');
});

listen('click', window, (event) => {
  if (event.target == modal) {
      dialog.classList.remove('is-visible');
      dialog.classList.add('is-hidden');
      modal.classList.remove('modal-bg-dark');
  }
});

// Post
const post = select('button');
const text = select('textarea');
const fileInput = select('.file-input');
const fileName = select('.file-name');
const platform = select('.platform');

listen('change', fileInput, () => {
  let file = fileInput.files[0];

  if (file.type.startsWith('image/')) {
      fileName.innerText = `${fileInput.files[0].name}`;
  } else {
      fileName.innerText = `Choose a picture to post`;
  }
});

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
  let userIcon = create('i');
  let date = create('p');
  let name = create('p');

  profile.classList.add('fa-solid');
  profile.classList.add('fa-user');
  name.innerText = newSubscriber.name;
  date.innerText = new Date().toDateString();

  return [userIcon, name, date];
}

function createHeader() {
  let header = create('div');
  let content = postHeaderContent();
  header.classList.add('flex');

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

function isValid() {
  if (text.value !== "" || fileInput.files.length !== 0) {
    return true;
  }
}

function createPost() {
  if (isValid ()) {
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

listen('click', post, () => {
  createPost();
  fileInput.value = null;
  fileName.innerText = '';
  text.value = '';
});
