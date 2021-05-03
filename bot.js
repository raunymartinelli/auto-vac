import fs from 'fs'
import { resolve } from 'path'
import puppeteer from 'puppeteer'

// OS DADOS DO PRIMEIRO APLICANTE SERÃO OS MESMOS QUE JÁ FORAM CADASTRADOS
// NO MOMENTO DA CRIAÇÃO DA CONTA NO VAC
const DATA_NASCIMENTO_PRIMEIRO_APLICANTE = '1992-01-01'

const NOME_SEGUNDO_APLICANTE = 'PRIMEIRO-NOME'
const SOBRENOME_SEGUNDO_APLICANTE = 'SOBRENOME'
const DATA_NASCIMENTO_SEGUNDO_APLICANTE = '1992-01-01'

const TELEFONE = '7512345678'

const EMAIL = 'email@do-vac.com'
const SENHA = 'suaSenhaDoVac'

var otps = []

function substringBetween(s, a, b) {
    var p = s.indexOf(a) + a.length;
    return s.substring(p, s.indexOf(b, p));
}

async function bot() {
    const browser = await puppeteer.launch({
        headless: false,
        // deviceScaleFactor: 1,
        // isMobile: true,
        // hasTouch: true,
        devtools: false,
        ignoreHTTPErrors: true,
        args: [
            '--no-sandbox',
        ],
    })
    
    const page = (await browser.pages())[0]

    await page.setViewport({
        width: 1000,
        height: 1000
    })

    var previousSession = true

    if (
        fs.existsSync(
            resolve(__dirname, `cookies.json`)
        )
    ) {
        previousSession = JSON.parse(
            fs.readFileSync(
                resolve(
                    __dirname,
                    `cookies.json`
                )
            )
        )
    }

    if (previousSession) {
        let setCookies = previousSession.map(async (cookie) => {
            await page.setCookie(cookie)
        })

        await Promise.all(setCookies)

        await page.goto('https://www.vfsglobal.ca/IRCC-AppointmentWave1/Home', {
            waitUntil: ['domcontentloaded', 'networkidle2'],
            timeout: 0,
        })
    
    }

    await page.click('#EmailId')
    await page.keyboard.type(EMAIL, { delay: 2 })
    await page.waitForSelector('#Password')
    await page.waitFor(1000)
    await page.click('#Password')
    await page.keyboard.type(SENHA, { delay: 2 })

    await page.waitForSelector('#CaptchaInputText')
    await page.click('#CaptchaInputText')

    page.on("dialog", (dialog) => {
        dialog.accept()
    })

    async function routine() {
        // Check for RECIFE
        console.log('Verificando RECIFE')
        await page.waitForSelector('#Accordion1 > div > div.AccordionPanelContent > div > ul > li:nth-child(1) > a', {
            timeout: 20000
        })

        await page.click('#Accordion1 > div > div.AccordionPanelContent > div > ul > li:nth-child(1) > a')
        await page.waitForSelector('#LocationId')
        await page.click('#LocationId')
        await page.waitFor(3000)
        await page.keyboard.type('Canada Visa Application Center - Rec', { delay: 8 })
        
        setTimeout(async () => {
            await page.waitForSelector('#NoOfApplicantId')
            await page.click('#NoOfApplicantId')
            await page.waitFor(3000)
            await page.keyboard.type('2', { delay: 2 })

            setTimeout(async () => {
                await page.waitForSelector('#IAgree')
                await page.click('#IAgree')
        
                setTimeout(async () => {
                    await page.waitForSelector('#btnContinue')
                    await page.click('#btnContinue')

                    setTimeout(async () => {
                        await page.waitForSelector('body > div.wrapper > div.main-container > div.rightpanel > div.frm-container > a')
                        await page.click('body > div.wrapper > div.main-container > div.rightpanel > div.frm-container > a')

                        setTimeout(async () => {
                            await page.waitForSelector('#DateOfBirth')
                            await page.click('#DateOfBirth')
                            await page.$eval('#DateOfBirth', el => el.value = DATA_NASCIMENTO_PRIMEIRO_APLICANTE)

                            setTimeout(async () => {
                                await page.waitForSelector('#Mobile')
                                await page.click('#Mobile')
                                await page.keyboard.type(TELEFONE, { delay: 8 })
        
                                await page.waitForSelector('#submitbuttonId')
                                await page.click('#submitbuttonId')

                                setTimeout(async () => {
                                    await page.waitForSelector('body > div.wrapper > div.main-container > div.rightpanel > div.frm-container > a')
                                    await page.click('body > div.wrapper > div.main-container > div.rightpanel > div.frm-container > a')

                                    setTimeout(async () => {
                                        await page.waitForSelector('#DateOfBirth')
                                        await page.click('#DateOfBirth')
                                        await page.$eval('#DateOfBirth', el => el.value = DATA_NASCIMENTO_SEGUNDO_APLICANTE)

                                        await page.waitForSelector('#FirstName')
                                        await page.click('#FirstName')
                                        await page.$eval('#FirstName', el => el.value = NOME_SEGUNDO_APLICANTE)

                                        await page.waitForSelector('#LastName')
                                        await page.click('#LastName')
                                        await page.$eval('#LastName', el => el.value = SOBRENOME_SEGUNDO_APLICANTE)

                                        setTimeout(async () => {
                                            await page.waitForSelector('#Mobile')
                                            await page.click('#Mobile')
                                            await page.keyboard.type(TELEFONE, { delay: 8 })
                    
                                            await page.waitForSelector('#submitbuttonId')
                                            await page.click('#submitbuttonId')

                                            setTimeout(async () => {
                                                await page.waitForSelector('#ApplicantListForm > div.frm-button > input')
                                                await page.click('#ApplicantListForm > div.frm-button > input')

                                                await page.waitForSelector('#calendar > table > tr > td.fc-header-right > span')
                                                await page.click('#calendar > table > tr > td.fc-header-right > span')

                                                setTimeout(async () => {
                                                    /*
                                                        CHECK FOR BRASILIA
                                                    */

                                                    console.log('Verificando BRASILIA')
                                                    await page.waitForSelector('#Accordion1 > div > div.AccordionPanelContent > div > ul > li:nth-child(1) > a', {
                                                        timeout: 20000
                                                    })
                                                
                                                    await page.click('#Accordion1 > div > div.AccordionPanelContent > div > ul > li:nth-child(1) > a')
                                                    await page.waitForSelector('#LocationId')
                                                    await page.click('#LocationId')
                                                    await page.waitFor(3000)
                                                    await page.keyboard.type('Canada Visa Application Center - Brasi', { delay: 8 })
                                                    
                                                    setTimeout(async () => {
                                                        await page.waitForSelector('#NoOfApplicantId')
                                                        await page.click('#NoOfApplicantId')
                                                        await page.waitFor(3000)
                                                        await page.keyboard.type('2', { delay: 2 })
                                                
                                                        setTimeout(async () => {
                                                            await page.waitForSelector('#IAgree')
                                                            await page.click('#IAgree')
                                                    
                                                            setTimeout(async () => {
                                                                await page.waitForSelector('#btnContinue')
                                                                await page.click('#btnContinue')
                                                
                                                                setTimeout(async () => {
                                                                    await page.waitForSelector('body > div.wrapper > div.main-container > div.rightpanel > div.frm-container > a')
                                                                    await page.click('body > div.wrapper > div.main-container > div.rightpanel > div.frm-container > a')
                                                
                                                                    setTimeout(async () => {
                                                                        await page.waitForSelector('#DateOfBirth')
                                                                        await page.click('#DateOfBirth')
                                                                        await page.$eval('#DateOfBirth', el => el.value = DATA_NASCIMENTO_PRIMEIRO_APLICANTE)
                                                
                                                                        setTimeout(async () => {
                                                                            await page.waitForSelector('#Mobile')
                                                                            await page.click('#Mobile')
                                                                            await page.keyboard.type(TELEFONE, { delay: 8 })
                                                    
                                                                            await page.waitForSelector('#submitbuttonId')
                                                                            await page.click('#submitbuttonId')
                                                
                                                                            setTimeout(async () => {
                                                                                await page.waitForSelector('body > div.wrapper > div.main-container > div.rightpanel > div.frm-container > a')
                                                                                await page.click('body > div.wrapper > div.main-container > div.rightpanel > div.frm-container > a')
                                                
                                                                                setTimeout(async () => {
                                                                                    await page.waitForSelector('#DateOfBirth')
                                                                                    await page.click('#DateOfBirth')
                                                                                    await page.$eval('#DateOfBirth', el => el.value = DATA_NASCIMENTO_SEGUNDO_APLICANTE)
                                                
                                                                                    await page.waitForSelector('#FirstName')
                                                                                    await page.click('#FirstName')
                                                                                    await page.$eval('#FirstName', el => el.value = NOME_SEGUNDO_APLICANTE)
                                                
                                                                                    await page.waitForSelector('#LastName')
                                                                                    await page.click('#LastName')
                                                                                    await page.$eval('#LastName', el => el.value = SOBRENOME_SEGUNDO_APLICANTE)
                                                
                                                                                    setTimeout(async () => {
                                                                                        await page.waitForSelector('#Mobile')
                                                                                        await page.click('#Mobile')
                                                                                        await page.keyboard.type(TELEFONE, { delay: 8 })
                                                                
                                                                                        await page.waitForSelector('#submitbuttonId')
                                                                                        await page.click('#submitbuttonId')
                                                
                                                                                        setTimeout(async () => {
                                                                                            await page.waitForSelector('#ApplicantListForm > div.frm-button > input')
                                                                                            await page.click('#ApplicantListForm > div.frm-button > input')
                                                
                                                                                            setTimeout(async () => {
                                                                                                await page.waitForSelector('#OTPe')
                                                                                                await page.click('#OTPe')

                                                                                                let done = false

                                                                                                while (!done) {
                                                                                                    while (!fs.existsSync('otp-mail.txt')) {
                                                                                                        await page.waitFor(1000)
                                                                                                    }

                                                                                                    let mail = fs.readFileSync('otp-mail.txt', 'utf8')
                                                                                                    let OTP = substringBetween(mail.toString(), 'Password (OTP) is ', '. Please')

                                                                                                    if (!otps.includes(OTP)) {
                                                                                                        otps.push(OTP)
                                                                                                        done = true
                                                                                                    } else {
                                                                                                        fs.unlinkSync('otp-mail.txt')
                                                                                                    }
                                                                                                }

                                                                                                const mail = fs.readFileSync('otp-mail.txt', 'utf8')
                                                                                                const OTP = substringBetween(mail.toString(), 'Password (OTP) is ', '. Please')
                                                                                                fs.unlinkSync('otp-mail.txt')
                                                
                                                                                                await page.keyboard.type(OTP, { delay: 3 })
                                                                                                await page.waitForSelector('#txtsub')
                                                                                                await page.click('#txtsub')

                                                                                                setTimeout(async () => {
                                                                                                    await page.waitForSelector('#calendar > table > tr > td.fc-header-right > span')
                                                                                                    await page.click('#calendar > table > tr > td.fc-header-right > span')

                                                                                                    setTimeout(async () => {
                                                                                                        /*
                                                                                                            CHECK FOR RIO DE JANEIRO
                                                                                                        */
                                                        
                                                                                                        console.log('Verificando RIO DE JANEIRO')
                                                                                                        await page.waitForSelector('#Accordion1 > div > div.AccordionPanelContent > div > ul > li:nth-child(1) > a', {
                                                                                                            timeout: 20000
                                                                                                        })
                                                                                                    
                                                                                                        await page.click('#Accordion1 > div > div.AccordionPanelContent > div > ul > li:nth-child(1) > a')
                                                                                                        await page.waitForSelector('#LocationId')
                                                                                                        await page.click('#LocationId')
                                                                                                        await page.waitFor(3000)
                                                                                                        await page.keyboard.type('Canada Visa Application Center - Rio de Jane', { delay: 8 })
                                                                                                        
                                                                                                        setTimeout(async () => {
                                                                                                            await page.waitForSelector('#NoOfApplicantId')
                                                                                                            await page.click('#NoOfApplicantId')
                                                                                                            await page.waitFor(3000)
                                                                                                            await page.keyboard.type('2', { delay: 2 })
                                                                                                    
                                                                                                            setTimeout(async () => {
                                                                                                                await page.waitForSelector('#IAgree')
                                                                                                                await page.click('#IAgree')
                                                                                                        
                                                                                                                setTimeout(async () => {
                                                                                                                    await page.waitForSelector('#btnContinue')
                                                                                                                    await page.click('#btnContinue')
                                                                                                    
                                                                                                                    setTimeout(async () => {
                                                                                                                        await page.waitForSelector('body > div.wrapper > div.main-container > div.rightpanel > div.frm-container > a')
                                                                                                                        await page.click('body > div.wrapper > div.main-container > div.rightpanel > div.frm-container > a')
                                                                                                    
                                                                                                                        setTimeout(async () => {
                                                                                                                            await page.waitForSelector('#DateOfBirth')
                                                                                                                            await page.click('#DateOfBirth')
                                                                                                                            await page.$eval('#DateOfBirth', el => el.value = DATA_NASCIMENTO_PRIMEIRO_APLICANTE)
                                                                                                    
                                                                                                                            setTimeout(async () => {
                                                                                                                                await page.waitForSelector('#Mobile')
                                                                                                                                await page.click('#Mobile')
                                                                                                                                await page.keyboard.type(TELEFONE, { delay: 8 })
                                                                                                        
                                                                                                                                await page.waitForSelector('#submitbuttonId')
                                                                                                                                await page.click('#submitbuttonId')
                                                                                                    
                                                                                                                                setTimeout(async () => {
                                                                                                                                    await page.waitForSelector('body > div.wrapper > div.main-container > div.rightpanel > div.frm-container > a')
                                                                                                                                    await page.click('body > div.wrapper > div.main-container > div.rightpanel > div.frm-container > a')
                                                                                                    
                                                                                                                                    setTimeout(async () => {
                                                                                                                                        await page.waitForSelector('#DateOfBirth')
                                                                                                                                        await page.click('#DateOfBirth')
                                                                                                                                        await page.$eval('#DateOfBirth', el => el.value = DATA_NASCIMENTO_SEGUNDO_APLICANTE)
                                                                                                    
                                                                                                                                        await page.waitForSelector('#FirstName')
                                                                                                                                        await page.click('#FirstName')
                                                                                                                                        await page.$eval('#FirstName', el => el.value = NOME_SEGUNDO_APLICANTE)
                                                                                                    
                                                                                                                                        await page.waitForSelector('#LastName')
                                                                                                                                        await page.click('#LastName')
                                                                                                                                        await page.$eval('#LastName', el => el.value = SOBRENOME_SEGUNDO_APLICANTE)
                                                                                                    
                                                                                                                                        setTimeout(async () => {
                                                                                                                                            await page.waitForSelector('#Mobile')
                                                                                                                                            await page.click('#Mobile')
                                                                                                                                            await page.keyboard.type(TELEFONE, { delay: 8 })
                                                                                                                    
                                                                                                                                            await page.waitForSelector('#submitbuttonId')
                                                                                                                                            await page.click('#submitbuttonId')
                                                                                                    
                                                                                                                                            setTimeout(async () => {
                                                                                                                                                await page.waitForSelector('#ApplicantListForm > div.frm-button > input')
                                                                                                                                                await page.click('#ApplicantListForm > div.frm-button > input')
                                                                                                    
                                                                                                                                                setTimeout(async () => {
                                                                                                                                                    await page.waitForSelector('#OTPe')
                                                                                                                                                    await page.click('#OTPe')
                                                        
                                                                                                                                                    let done = false

                                                                                                                                                    while (!done) {
                                                                                                                                                        while (!fs.existsSync('otp-mail.txt')) {
                                                                                                                                                            await page.waitFor(1000)
                                                                                                                                                        }
                                                        
                                                                                                                                                        let mail = fs.readFileSync('otp-mail.txt', 'utf8')
                                                                                                                                                        let OTP = substringBetween(mail.toString(), 'Password (OTP) is ', '. Please')
                                                        
                                                                                                                                                        if (!otps.includes(OTP)) {
                                                                                                                                                            otps.push(OTP)
                                                                                                                                                            done = true
                                                                                                                                                        } else {
                                                                                                                                                            fs.unlinkSync('otp-mail.txt')
                                                                                                                                                        }
                                                                                                                                                    }
                                                        
                                                                                                                                                    const mail = fs.readFileSync('otp-mail.txt', 'utf8')
                                                                                                                                                    const OTP = substringBetween(mail.toString(), 'Password (OTP) is ', '. Please')
                                                                                                                                                    fs.unlinkSync('otp-mail.txt')
                                                                                                    
                                                                                                                                                    await page.keyboard.type(OTP, { delay: 3 })
                                                                                                                                                    await page.waitForSelector('#txtsub')
                                                                                                                                                    await page.click('#txtsub')
                                                        
                                                                                                                                                    setTimeout(async () => {
                                                                                                                                                        await page.waitForSelector('#calendar > table > tr > td.fc-header-right > span')
                                                                                                                                                        await page.click('#calendar > table > tr > td.fc-header-right > span')

                                                                                                                                                        setTimeout(async () => {
                                                                                                                                                            routine()
                                                                                                                                                        }, 30000)
                                                                                                                                                    }, 3000)
                                                                                                                                                }, 5000)
                                                                                                                                            }, 5000)
                                                                                                                                        }, 2000)
                                                                                                                                    }, 2000)
                                                                                                                                }, 3000)
                                                                                                                            }, 2000)
                                                                                                                        }, 2000)
                                                                                                                    }, 2000)
                                                                                                                }, 2000)
                                                                                                            }, 2000)
                                                                                                        }, 2000)
                                                                                                    }, 30000)
                                                                                                }, 3000)
                                                                                            }, 5000)
                                                                                        }, 5000)
                                                                                    }, 2000)
                                                                                }, 2000)
                                                                            }, 3000)
                                                                        }, 2000)
                                                                    }, 2000)
                                                                }, 2000)
                                                            }, 2000)
                                                        }, 2000)
                                                    }, 2000)
                                                }, 30000)
                                            }, 5000)
                                        }, 2000)
                                    }, 2000)
                                }, 3000)
                            }, 2000)
                        }, 2000)
                    }, 2000)
                }, 2000)
            }, 2000)
        }, 2000)
    }

    routine()
}

bot()