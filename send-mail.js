const sendFormEl = document.getElementById("sendmail");
const fromEl = document.getElementById("from");
const subjectEl = document.getElementById("subject");
const emailEl = document.getElementById("emails");
const messageEl = document.getElementById("message");
const errorEl = document.getElementById("error");
const successEl = document.getElementById("success");

errorEl.style.display = "none";
successEl.style.display = "none";

sendFormEl.addEventListener("submit", async function (e) {
  e.preventDefault();

  errorEl.style.display = "none";
  successEl.textContent = "Sending mail...";
  successEl.style.display = "block";

  let from = fromEl.value;
  let subject = subjectEl.value;
  let to = emailEl.value;
  let text = messageEl.value;

  console.log(`${from}\n${subject}\n${to}\n${text}`);

  const reqBody = {
    from: from,
    subject: subject,
    to: to,
    text: text,
  };

  const reqOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqBody),
  };

  try {
    const url = "http://localhost:4000/mail";
    const response = await fetch(url, reqOptions);
    const data = await response.json();
    console.log(data);

    let statusCode = response.status;

    if (statusCode === 200) {
      successEl.textContent = data.message;
      sendFormEl.reset();
    } else {
      successEl.style.display = "none";
      errorEl.textContent = data.message;
      errorEl.style.display = "block";
    }
  } catch (err) {
    console.log(err.stack);
  }
});
