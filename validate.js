// Validate Email Address
function isEmailValid(email) {
	"use strict";
	var atIndex, localPart, domainPart, localRegExp, domainRegExp, i;
	atIndex = email.search("@");
	// email address does not contain any @.
	if (atIndex === -1) {
		document.getElementById('errorfieldforemail').innerHTML = "invalid email address";
		return false;
	}
	// email address contains more than one @.
	for (i = 0; i < email.length; i += 1) {
		if (email.charAt(i) === "@" && i !== atIndex) {
			document.getElementById('errorfieldforemail').innerHTML = "invalid email address";
			return false;
		}
	}
	localPart = email.slice(0, atIndex);
	domainPart = email.slice(atIndex + 1);
	// first check local-part
	localRegExp = /^[a-zA-Z\d\.!#\$%&\*\+-\/=\?\^_{\|}]*$/;
	// local-part contains characters which are not allowed.
	if (!localRegExp.test(localPart)) {
		document.getElementById('errorfieldforemail').innerHTML = "invalid email address";
		return false;
	}
    // local-part exceeds 253 characters in length
	if (localPart.length > 253) {
		document.getElementById('errorfieldforemail').innerHTML = "invalid email address";
		return false;
	}
	// local-part begins with a period or it has two consecutive periods.
	if (/^[\.]/.test(localPart) || /\.\./.test(localPart)) {
		document.getElementById('errorfieldforemail').innerHTML = "invalid email address";
		return false;
	}
	// second check domain-part
	domainRegExp = /^[a-zA-Z0-9\.;]*$/;
	// domain-part contains characters which are not allowed.
	if (!domainRegExp.test(domainPart)) {
		document.getElementById('errorfieldforemail').innerHTML = "invalid email address";
		return false;
	}
	// domain-part exceeds 253 characters in length
	if (domainPart.length > 253) {
		document.getElementById('errorfieldforemail').innerHTML = "invalid email address";
		return false;
	}
	// domain-part begins with a period or it has two consecutive periods or it ends with a period.
	if (/^[\.]/.test(domainPart) || /\.\./.test(domainPart) || /[\.]$/.test(domainPart)) {
		document.getElementById('errorfieldforemail').innerHTML = "invalid email address";
		return false;
	}
	document.getElementById('errorfieldforemail').innerHTML = "";
	return true;
}

// Validate UserName
function isUserNameValid(username) {
	"use strict";
	var regExp;
	regExp = /^[a-zA-Z]*$/;
	if (username.length > 12 && !regExp.test(username)) {
		document.getElementById('errorfieldforname').innerHTML = "must only use letters A-Z or a-z and cannot be more than 12 letters long";
		return false;
	}
	if (username.length > 12) {
		document.getElementById('errorfieldforname').innerHTML = "cannot be more than 12 letters long";
		return false;
	}
	if (!regExp.test(username)) {
		document.getElementById('errorfieldforname').innerHTML = "must only use letters A-Z or a-z";
		return false;
	}
	document.getElementById('errorfieldforname').innerHTML = "";
	return true;
}

// Validate Year of Birth
function isBirthYearValid(birthyear) {
	"use strict";
	var date, currentYear, regExp;
	regExp = /^[0-9]*$/;
	if (!regExp.test(birthyear)) {
		document.getElementById('errorfieldforyear').innerHTML = "invalid year";
		return false;
	}
	if (birthyear <= 1870) {
		document.getElementById('errorfieldforyear').innerHTML = "invalid year";
		return false;
	}
	date = new Date();
	currentYear = date.getFullYear();
	if (birthyear >= currentYear + 1) {
		document.getElementById('errorfieldforyear').innerHTML = "invalid year";
		return false;
	}
	document.getElementById('errorfieldforyear').innerHTML = "";
	return true;
}

// Validate Password
function isPasswordValid(password) {
	"use strict";
	var regExp;
	// password length is smaller than 8
	if (password.length < 8) {
		document.getElementById('errorfieldforpassword').innerHTML = "must be at least 8 characters long";
		return false;
	}
	// password length is greater than 12
	if (password.length > 12) {
		document.getElementById('errorfieldforpassword').innerHTML = "cannot be more than 12 characters long";
		return false;
	}
	// may include a-z, A-Z and 0-9
	regExp = /^[a-zA-Z0-9]*$/;
	if (!regExp.test(password)) {
		document.getElementById('errorfieldforpassword').innerHTML = "must only contain letters and digits";
		return false;
	}
	// password does not contain at least one digit
	if (!/[0-9]/.test(password)) {
		document.getElementById('errorfieldforpassword').innerHTML = "must contain at least one digit";
		return false;
	}
	// password contains white space
	if (/[ ]+/.test(password)) {
		document.getElementById('errorfieldforpassword').innerHTML = "invalid password";
		return false;
	}
	document.getElementById('errorfieldforpassword').innerHTML = "";
	return true;
}

// Validate Retype Password
function isRetypePasswordValid(retypepassword) {
	"use strict";
	var password = document.getElementById('password').value;
	if (password !== retypepassword) {
		document.getElementById('errorfieldforretypepassword').innerHTML = "password does not match";
		return false;
	}
	document.getElementById('errorfieldforretypepassword').innerHTML = "";
	return true;
}

function register() {
	"use strict";
	var username, email, year, password, retypepassword, flag;
	username = document.getElementById('username').value;
	email = document.getElementById('email').value;
	year = document.getElementById('birthyear').value;
	password = document.getElementById('password').value;
	retypepassword = document.getElementById('repassword').value;
	flag = true;
	// Check UserName
	if (username.length === 0) {
		document.getElementById('errorfieldforname').innerHTML = "required field";
		flag = false;
	} else {
		flag = flag && isUserNameValid(username);
	}
	// Check Email Address
	if (email.length === 0) {
		document.getElementById('errorfieldforemail').innerHTML = "required field";
		flag = false;
	} else {
		flag = flag && isEmailValid(email);
	}
	// Check Year of Birth
	if (year.length === 0) {
		document.getElementById('errorfieldforyear').innerHTML = "required field";
		flag = false;
	} else {
		flag = flag && isBirthYearValid(year);
	}
	// Check Password
	if (password.length === 0) {
		document.getElementById('errorfieldforpassword').innerHTML = "required field";
		flag = false;
	} else {
		flag = flag && isPasswordValid(password);
	}
	// Check Retype Password
	if (retypepassword.length === 0) {
		document.getElementById('errorfieldforretypepassword').innerHTML = "required field";
		flag = false;
	} else {
		flag = flag && isRetypePasswordValid(retypepassword);
	}
	if (flag) {
		alert("Register Successfully!");
	}
	return flag;
}