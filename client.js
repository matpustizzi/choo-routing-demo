const choo = require('choo')
const html = require('choo/html')
const app = choo()

const oops = {
  title : 'oops',
  media : 'http://stream1.gifsoup.com/view5/3997062/rick-perry-oops-o.gif',
  content : 'resource not found'
}

app.model({
  state: {
    currentPage : {}
  },
  reducers: {
    updatePages: (data, state) => {
      return { pages: data }
    }
  },
  effects: {
    fetchPages: (data, state, send, done) => {
      const pages = [
        { title : 'Bear', content : 'I\'m a bear', media : 'http://placebear.com/600/400' , slug : '/' },
        { title : 'Beard', content : 'I\'m a beard', media : 'http://placebeard.it/600/400' , slug : '/beard' },
        { title : 'Bill', content : 'I\'m a Bill', media : 'http://www.fillmurray.com/600/400' , slug : '/bill' },
        { title : 'Kitten', content : 'Meow', media : 'http://placekitten.com/600/400' , slug : '/kitten' }
      ]
       send('updatePages', pages, done)
    }
  }
})

const menu = (state, prev, send) => html`
	<nav>
    <ul>
  ${state.pages.map((page) => html`<li><a href="${page.slug}">${page.title}</button></li>`)}
    </ul>
  </nav>
`

const mainView = (state, prev, send) => {
  return html`
	<div>
	  ${menu(state, prev, send)}
    <main>
      <h1>${state.currentPage.title}</h1>
      <img src="${state.currentPage.media}"/>
      <div>${state.currentPage.content}</div>           
    </main>
  </div>
`  
}

const defaultView = (state, prev, send) => {
  if(state.pages){
    return mainView(state, prev, send)
  } else {
    send('fetchPages')
    return html`
      <div>loading</div>
    `
  }
}

app.router('*', (route) => [
  route('*', defaultView)
]);

app.use({ onStateChange: (action, state) => {
  var url = window.location.pathname
  state.currentPage = state.pages.find( (page) => page.slug == url ) || oops
} })

const tree = app.start()
document.body.appendChild(tree)