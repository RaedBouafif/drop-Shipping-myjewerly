export const UseTrueLength = (string) => {
    var chaine = cleaner(string)
    return chaine.length
}
export const UseTrueString = (string) => {
    return cleaner(string).join("")
}
const cleaner = (chaine) => {
    var render = Array.from(chaine)
    for (var i = 0; i < (render.length) - 1; i++) {
        if (render[i] == " " && render[i + 1] == " ") {
            render.splice(i, 1)
            i--
        }
    }
    if (render[0] !== undefined && render[0] == " ") {
        render.splice(0, 1)
    }
    if (render[render.length - 1] !== undefined && render[render.length - 1] == " ") {
        render.splice(render.length - 1, 1)
    }
    return render
}
/* email handle */
/*perfect email dqsfsdf@qsd.sdf*/
export const UseTrueEmail = (email) => {
    email = UseTrueString(email)
    return email.indexOf(" ") === -1 && email.indexOf("@") > 0 &&
        email.lastIndexOf(".") > email.indexOf("@") + 1 &&
        email.lastIndexOf(".") + 1 < email.length
}
/*username handle*/
export const UseTrueOneWord = (string) => {
    string = UseTrueString(string)
    return string.indexOf(" ") === -1
}


export const UsePerfectPassword = (pwd, length = { max: 20, min: 6 }) => {
    let arrayException = []
    if (pwd.length < length.min || pwd.length > length.max) {
        arrayException = [...arrayException, (pwd.length < length.min ? "Very short Password (<6)" : "Very long Password (>20)")]
    }
    /*at least one letter*/
    var pwdContains = ""
    const nbrLetter = Array.from(pwd)
        .filter(x => (x.charCodeAt(0) >= 65 && x.charCodeAt(0) <= 90)
            || (x.charCodeAt(0) >= 97 && x.charCodeAt(0) <= 122)).length
    if (nbrLetter === 0) {
        pwdContains += "Password should contains at least 1 letter"
    }
    /*at least one number*/
    const nbrNumber = Array.from(pwd)
        .filter(x => (x.charCodeAt(0) >= 48 && x.charCodeAt(0) <= 57)).length
    if (nbrNumber === 0) {
        if (nbrLetter === 0) {
            pwdContains += " , 1 number"
        }
        else {
            pwdContains += "Password should contains at least 1 number"
        }
    }
    /*at least one special char*/
    if ((nbrNumber + nbrLetter + Array.from(pwd).filter(x => x == " ").length) === pwd.length) {
        if (nbrLetter === 0 || nbrNumber === 0) {
            pwdContains += " , 1 special Character"
        }
        else {
            pwdContains += "Password should contains at least 1 special Character"
        }
    }
    if (pwdContains) arrayException = [...arrayException, pwdContains]
    return arrayException
}