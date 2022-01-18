let paragraph = document.getElementById("copied_text");

function bold() {
  const toBoldInputText = document.getElementById("user_input").value;
  enteredTextareaText = document.getElementById("user_text").value || "";

  paragraph.innerHTML = enteredTextareaText.replaceAll(
    toBoldInputText,
    `<b>${toBoldInputText}</b>`
  );
}

function copyText() {
  const enteredText = document.getElementById("user_text").value;
  paragraph.innerText = enteredText;
}
