function isValidUsername(value) {
    // const re = /\s*/;
    // return re.test(String(value).toLowerCase());
    // return value.indexOf(' ') >= 0
    // return /\s*/.test(value)
}
function validateUsername(value, setUsernameError) {
    if (value == "" || value.length >= 2) {
        setUsernameError("")
    }
    else if (value.length < 2) {
        setUsernameError("Username must be two characters long")
    }
    // else if (isValidUsername(value) || ( isValidUsername(value) && value.length >= 2  )) {
    //     setUsernameError("Use '_', no white spaces please")
    // }
    else {
        setUsernameError("Invalid Username")
    }
}
function isValidEmail(value) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase());
}

function validateEmail(value, setEmailError) {
    if (value == "") {
        setEmailError("")
    }
    else if (isValidEmail(value)) {
        setEmailError("")
    }
    else {
        setEmailError("Invalid Email")
    }
}

function validatePassword(value, setPasswordError) {
    if (value.length < 9) {
        setPasswordError("Password must be 9 characters")
    } else {
        setPasswordError("")
    }
}

// function validateInput(value, maxLength, setError) {
//     if (value.length > maxLength) {
//         setError("Invalid Input")
//     } else {
//         setError("")
//     }
// }
function validateInput(value, minLength, setError) {
    if (value.length < minLength) {
        setError("Invalid Input")
    } else {
        setError("")
    }
}

function calculateAngle(coordinates) {
    let startLat = coordinates[0]["latitude"]
    let startLng = coordinates[0]["longitude"]
    let endLat = coordinates[1]["latitude"]
    let endLng = coordinates[1]["longitude"]
    let dx = endLat - startLat
    let dy = endLng - startLng

    return Math.atan2(dy, dx) * 180 / Math.PI
}

function thousandSeparator(givenNum) {
    if(givenNum < 1000) return givenNum
    return givenNum.toString().replace(/(?=(\d{3})+(?!\d))/g, ",").charAt( 0 ) === ',' ? givenNum.toString().replace(/(?=(\d{3})+(?!\d))/g, ",").slice(1) : givenNum.toString().replace(/(?=(\d{3})+(?!\d))/g, ",") // givenNum.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
}

const utils = {
    validateUsername,
    isValidEmail,
    validateEmail,
    validatePassword,
    validateInput,
    calculateAngle,
    thousandSeparator,
};

export default utils;

