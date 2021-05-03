import fs from 'fs'

function substringBetween(s, a, b) {
    var p = s.indexOf(a) + a.length;
    return s.substring(p, s.indexOf(b, p));
}

const mail = fs.readFileSync('otp-mail.txt', 'utf8')

console.log(substringBetween(mail.toString(), 'Password (OTP) is ', '. Please'))