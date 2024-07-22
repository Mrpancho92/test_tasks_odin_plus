window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const username = document.getElementById("username");
  const lastname = document.getElementById("lastname");
  const dateofbirthday = document.getElementById("dateofbirthday");
  const date = new Date();
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const password2 = document.getElementById("password2");
  const button = document.getElementById("button");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  username.onblur = () => {
    checkInputs();
    lastCheckBeforeSending();
  };
  lastname.onblur = () => {
    checkInputs();
    lastCheckBeforeSending();
  };
  dateofbirthday.onblur = () => {
    checkInputs();
    lastCheckBeforeSending();
  };
  email.onblur = () => {
    checkInputs();
    lastCheckBeforeSending();
  };
  password.onblur = () => {
    checkInputs();
    lastCheckBeforeSending();
  };
  password2.onblur = () => {
    checkInputs();
    lastCheckBeforeSending();
  };

  function ms(time) {
    let year, month, day, hour, minute, second;

    second = Math.floor(time / 1000);
    minute = Math.floor(second / 60);
    second = second % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    day = Math.floor(hour / 24);
    hour = hour % 24;
    month = Math.floor(day / 30);
    day = day % 30;
    year = Math.floor(month / 12);
    month = month % 12;

    return { year, month, day, hour, minute, second };
  }

  function lastCheckBeforeSending() {
    if (
      username.parentNode.className === "form-control success" &&
      lastname.parentNode.className === "form-control success" &&
      dateofbirthday.parentNode.className === "form-control success" &&
      email.parentNode.className === "form-control success" &&
      password.parentNode.className === "form-control success" &&
      password2.parentNode.className === "form-control success"
    ) {
      button.disabled = false;
    }
  }

  function checkInputs() {
    const usernameValue = username.value.trim();
    const lastnameValue = lastname.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    function allLetter(uname) {
      let letters = /^[A-Z][a-z]*$/;
      if (uname.value.match(letters) && uname.value.length < 40) {
        return true;
      } else {
        console.log("Username must have alphabetcharactersonly");
        uname.focus();
        return false;
      }
    }

    if (dateofbirthday.value === "") {
      setErrorFor(dateofbirthday, "date of birthday cannot be blank");
    } else if (ms(date - new Date(dateofbirthday.value)).year < 18) {
      setErrorFor(dateofbirthday, "Your age is less than 18 years old");
    } else {
      setSuccessFor(dateofbirthday);
    }

    if (usernameValue === "") {
      setErrorFor(username, "Username cannot be blank");
    } else {
      if (allLetter(username)) {
        setSuccessFor(username);
      } else {
        setErrorFor(username, "Username cannot be blank");
      }
    }

    if (lastnameValue === "") {
      setErrorFor(lastname, "lastname cannot be blank");
    } else {
      if (allLetter(lastname)) {
        setSuccessFor(lastname);
      } else {
        setErrorFor(lastname, "lastname cannot be blank");
      }
    }

    if (emailValue === "") {
      setErrorFor(email, "Email cannot be blank");
    } else if (!isEmail(emailValue)) {
      setErrorFor(email, "Not a valid email");
    } else {
      setSuccessFor(email);
    }

    if (passwordValue === "") {
      setErrorFor(password, "Password cannot be blank");
    } else if (!isPassword(passwordValue) && !passwordValue.length < 8) {
      setErrorFor(password, "Not a valid password");
    } else {
      setSuccessFor(password);
    }

    if (password2Value === "") {
      setErrorFor(password2, "Password check cannot be blank");
    } else if (passwordValue !== password2Value) {
      setErrorFor(password2, "Password check does not match");
    } else {
      setSuccessFor(password2);
    }
  }

  function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");
    formControl.className = "form-control error";
    small.innerText = message;
  }

  function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
  }

  function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  }

  function isPassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  }
});
