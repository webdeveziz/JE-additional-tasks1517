function capitalTheFisrtLetter(str) { 
  // Это я тут сделал функцию, которая сделает первую букву любого приложения заглавным.
  // Иначе данные которые приходят из сети все строчные, и на экране они смотрятся не очень)
  const strWithoutFirstElem = str.split(' ').slice(1)
  const firstElemWithoutFirstLetter = str.split(' ').slice(0, 1).join().split('').slice(1).join('')
  const firstLetter = str.split('')[0].toUpperCase()
  const firstElemWithCapitalLetter = firstLetter + firstElemWithoutFirstLetter
  strWithoutFirstElem.unshift(firstElemWithCapitalLetter)
  return strWithoutFirstElem.join(' ')
}

function createNodeElemForPost(title, text){
  const post = document.createElement('div')
  post.id = 'post'
  post.classList.add('post')

  const postTitle = document.createElement('h1')
  postTitle.classList.add('post__title')
  postTitle.textContent = capitalTheFisrtLetter(title)

  const postText = document.createElement('p')
  postText.classList.add('post__text')
  postText.textContent = capitalTheFisrtLetter(text)

  const postCommentsText = document.createElement('b')
  postCommentsText.classList.add('post__comments-text')
  postCommentsText.textContent = 'Комментарии'

  const postComments = document.createElement('div')
  postComments.classList.add('post__comments')

  post.append(postTitle, postText, postCommentsText, postComments)
  return post
}

function createNodeElemForComments(email, comment) {
  const postComment = document.createElement('div')
  postComment.classList.add('post__comment')

  const postCommentAuthor = document.createElement('span')
  postCommentAuthor.classList.add('post-comment__author')
  postCommentAuthor.textContent = email

  const postCommentText = document.createElement('span')
  postCommentText.classList.add('post__comment-text')
  postCommentText.textContent = capitalTheFisrtLetter(comment)

  postComment.append(postCommentAuthor, postCommentText)
  return postComment
} 

async function renderPost(postId) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    if(!response.ok) throw new Error('Ошибочка!')
    const postData = await response.json()
    const post = createNodeElemForPost(postData.title, postData.body)
    const container = post.querySelector('.post__comments')
    document.body.prepend(post)

    const respComents = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postData.id}`)
    if(!respComents.ok) throw new Error('Ошибочка!!')
    const commData = await respComents.json()
    commData.forEach(comment => container.append(createNodeElemForComments(comment.email, comment.body)))
  } catch (error) {
    console.error(error)
  }

}

renderPost(1)
