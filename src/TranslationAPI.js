export async function getTranslation(text) {
  let response = await fetch(`https://api.funtranslations.com/translate/yoda.json?text=${text}`);
  let posts = await response.json();
  if(posts.contents) {
    return '"' + posts.contents.translated + '"';
  }
  else if(posts.error) {
    return posts.error.message;
  }
  else {
    return "Oops, something went wrong";
  }
}
