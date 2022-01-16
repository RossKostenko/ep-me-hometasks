const paragraphText = document.getElementById("copied_text");

function bold() {
  const enteredInputText = document.getElementById("user_input").value;
  enteredTextareaText = document.getElementById("user_text");
  paragraphText.innerHTML = enteredTextareaText.replace(
    enteredInputText,
    `<b>${enteredInputText}</b>`
  );
}

function copyText() {
  const enteredText = document.getElementById("user_text");
  paragraphText.innerText = enteredText.value;
}
