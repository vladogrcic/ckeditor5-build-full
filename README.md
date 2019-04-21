# CKeditor 5 Build Full
This is a custom build of the CKeditor 5 with which you add images by typing in the url.
You are also able to use a custom interface by adding this:
```javascript
/*
* @param {boolean} input - With this you receive whether your interface is needed.
*/
window.embedImageExecuted = function(input){
	// Here you add the code with which you call your interface.
}
```

Also, you pass the image url using this code:
```javascript
executeEmbedImage('https://www.imagesite.com/image/url.jpg');
```
