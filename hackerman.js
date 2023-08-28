const userInput = document.getElementById("username");
let terminal = document.getElementById("terminal");
let startBtn = document.getElementById("btn");

const glitchedTextEffect = (username) => {
  const letters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$";

  let interval = null;
  const glitchedUsername = document.getElementById("glitchedUsername");
  glitchedUsername.innerHTML = ` <h2 data-value = "${username}">${username}</h2>`;
  glitchedUsername
    .querySelector("h2")
    .addEventListener("mouseover", (event) => {
      let iteration = 0;

      clearInterval(interval);

      interval = setInterval(() => {
        event.target.innerText = event.target.innerText
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return event.target.dataset.value[index];
            }
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join("");

        if (iteration >= event.target.dataset.value.length) {
          clearInterval(interval);
        }
        iteration += 1 / 4;
      }, 30);
    });
};

// submit input after ENTER key pressed.
userInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    startBtn.click();
  }
});

startBtn.addEventListener("click", async () => {
  let username = userInput.value;
  glitchedTextEffect(username);
  let commandLines = [
    `Connecting to platform...`,
    `Finding User with Username: ${username}`,
    `Username ${username} found...`,
    `Trying to crack Password...`,
    `Trying a combination of 4.5 Million passwords...`,
    `Match not found...`,
    `Trying a combination of Another 2 Million passwords...`,
    `Match not found...`,
    `Trying a combination of Another 4 Million passwords...`,
    `Password match found...`,
    `Account hack successful...`,
    `Sending information to Master...`,
    `......`,
    `......`,
    `......`,
    `......`,
    `........You Got Fooled!! 😂`,
  ];
  let randomTimeouts = [
    2000, 2000, 4000, 2000, 2000, 2000, 2000, 5000, 2000, 2000, 4000,
  ];

  let i = 0;
  const loadingCount = async () => {
    // For persentage animation
    let percent = 0;
    while (percent !== 100) {
      let increament = Math.floor(Math.random() * 30 + 1);
      percent = percent + increament;
      if (percent > 100) {
        percent = 100;
      }
      await new Promise((a) => setTimeout(a, 150)); // Gives dalay in loading animation
      terminal.innerHTML = `Initializing Hacking program... ${percent}%<br>`;
    }
  };

  const typingAnimation = async (sentence, index) => {
    startBtn.disabled = true;
    if (index < sentence.length) {
      terminal.innerHTML += sentence[index]; // inserts each letter of sentence
      index++;
      setTimeout(
        // Creates random delay in each letter animation
        () => typingAnimation(sentence, index),
        Math.random() * 150 + 50
      );
    } else {
      // Inserts blinkingCursor
      terminal.innerHTML += "<span class='blinking-cursor'></span>";
      i++;
      if (i < commandLines.length) {
        terminal.innerHTML += "<br>";
        setTimeout(
          // Provides next sentence with 0th index with random timeout
          () => typingAnimation(commandLines[i], 0),
          randomTimeouts[i]
        );
      }
    }
  };

  if (username == "") {
    // Condition for empty username
    terminal.innerHTML = "Please Enter a Username <br>";
  } else {
    // if there is a username run below
    await loadingCount();
    await typingAnimation(commandLines[i], 0, i);
    startBtn.disabled = false;
  }
});
