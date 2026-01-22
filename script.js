// selecting elements
const form = document.getElementById("registrationForm");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const formStatus = document.getElementById("formStatus");

//retrieves previously saved username from the browser
//No need for event listener since script at the end of body
//DOMContent already loaded
const savedUsername = localStorage.getItem("registeredUsername");
if (savedUsername) {
  usernameInput.value = savedUsername;
}



// validation function
const validateInput = (input, errorId) => {
  const errorSpan = document.getElementById(errorId);
  //   if (input.id === "confirmPassword") {
  //     if (input.value !== passwordInput.value) {
  //       input.setCustomValidity("Passwords do not match.");
  //     } else {
  //       input.setCustomValidity("");
  //     }
  //   }



  // Confirm password check
  if (input.id === "confirmPassword") {
    input.setCustomValidity(
      input.value !== passwordInput.value ? "Passwords do not match." : "",
    );
  }

  //   if (!input.validity.valid) {
  //     if (input.validity.valueMissing) {
  //       errorSpan.textContent = "This field is required.";
  //     } else if (input.validity.tooShort) {
  //       errorSpan.textContent = `Minimum length is ${input.minLength} characters.`;
  //     } else if (input.validity.typeMismatch) {
  //       errorSpan.textContent = "Please enter a valid email address.";
  //     } else if (input.validity.patternMismatch) {
  //       errorSpan.textContent = "Passwrd does not meet requirements. ";
  //     } else if (input.validity.customError) {
  //       errorSpan.textContent = input.validationMessage;
  //     }
  //   } else {
  //     errorSpan.textContent = "";
  //   }

  const { validity, minLength, validationMessage } = input;

  let message = "";
  if (!validity.valid) {
    if (validity.valueMissing) {
      message = "This field is required.";
    } else if (validity.tooShort) {
      message = `Minimum length is ${minLength} characters.`;
    } else if (validity.typeMismatch) {
      message = "Please enter a valid email address.";
    } else if (validity.patternMismatch) {
      message = "Password does not meet requirements.";
    } else if (validity.customError) {
      message = validationMessage;
    }
  }
  errorSpan.textContent = message;
};

//event listeners for real-time feedback
[usernameInput, emailInput, passwordInput, confirmPasswordInput].forEach(
  (input) => {
    input.addEventListener("input", () => {
     
      formStatus.textContent = "";
      formStatus.className = "";
      validateInput(input, `${input.id}Error`);

      if (input === passwordInput && confirmPasswordInput.value !== "") {
        validateInput(confirmPasswordInput, "confirmPasswordError");
      }
    });
  }
);

// handle form submission
form.addEventListener("submit", (e) => {
  //stop page reload
  e.preventDefault();

  let isFormValid = true;
  //re validate before submission
  [usernameInput, emailInput, passwordInput, confirmPasswordInput].forEach(
    (input) => {
      validateInput(input, `${input.id}Error`);
      if (!input.validity.valid) {
        isFormValid = false;
      }
    },
  );

  if (isFormValid) {
    localStorage.setItem("registeredUsername", usernameInput.value);

    formStatus.textContent = "Registration successful";
    formStatus.className = "success";

    alert("Registration Successful!");
    form.reset();

    [usernameInput, emailInput, passwordInput, confirmPasswordInput].forEach(
      (input) => {
        input.setCustomValidity("");
        document.getElementById(`${input.id}Error`).textContent = "";
      },
    );

  } else {
    formStatus.textContent = "Please fix the errors above.";
    formStatus.className = "error";
    
    const firstInvalid = form.querySelector(":invalid");
    if (firstInvalid) {
        firstInvalid.focus();
    }
  }
});
