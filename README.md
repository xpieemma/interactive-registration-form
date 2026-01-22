
event.preventDefault() stops the browser from applying its default behavior, which prevents the page from reloading, preserves the current state, and prevents data loss. JS intercepts the submission, performs validation, and displays feedback. JS has more control.

HTML5 provides automatic constraints like required, but JS makes complex logic feel seamless while maintaining styling control. JS pushes the user experience to a different sphere.

localStorage helps to save the username upon successful registration and, on page load, gives the option to auto-fill the field.

Confirm password is challenging to keep its validation in harmony if the user goes back and changes the original password field. This demands another re-validation check on the confirmation field whenever the password changes.

The input event triggers validation immediately as the user types. It provides instant feedback rather than waiting for submission.