import imap from 'imap'
import fs from 'fs'

var myImap = new imap({
    user: 'E-MAIL DO YAHOO',
    password: 'TOKEN GERADO PARA APPS DENTRO DO YAHOO',
    host: 'imap.mail.yahoo.com',
    port: 993,
    tls: true 
})

function openInbox(cb) {
    myImap.openBox('INBOX', true, cb);
}

myImap.once('ready', function() { // this event will call once the imap is successfully made connection with imap host
    console.log('Connection ready')

    openInbox(function (err, box) {
        if (err) throw err
        
        myImap.search([ 'UNSEEN', ['SINCE', 'Apr 30, 2021'] ], function(err, results) {
            if (err) {
                console.log(err)
            } else {
                try {
                    var f = myImap.fetch(results, { bodies: '' })
                    
                    const totalMailAmount = results.length
        
                    f.on('message', function(msg, seqno) {
                        console.log('Message #%d', seqno)
                        var prefix = '(#' + seqno + ') '
                        msg.on('body', function(stream, info) {
                            console.log(prefix + 'Body')
        
                            if (seqno === totalMailAmount) {
                                stream.pipe(fs.createWriteStream('otp-mail.txt'))
                            }
                        })
        
                        msg.once('end', function() {
                            console.log(prefix + 'Finished')
                        })
                    })
                    
                    f.once('error', function(err) {
                        console.log('Fetch error: ' + err)
                    })
                } catch (err) {
                    console.log(err)
                }
            }
        })
    })

    setInterval(() => {
        openInbox(function (err, box) {
            if (err) throw err
            
            myImap.search([ 'UNSEEN', ['SINCE', 'Apr 30, 2021'] ], function(err, results) {
                if (err) {
                    console.log(err)
                } else {
                    try {
                        var f = myImap.fetch(results, { bodies: '' })
                        
                        const totalMailAmount = results.length
            
                        f.on('message', function(msg, seqno) {
                            console.log('Message #%d', seqno)
                            var prefix = '(#' + seqno + ') '
                            msg.on('body', function(stream, info) {
                                console.log(prefix + 'Body')
            
                                if (seqno === totalMailAmount) {
                                    stream.pipe(fs.createWriteStream('otp-mail.txt'))
                                }
                            })
            
                            msg.once('end', function() {
                                console.log(prefix + 'Finished')
                            })
                        })
                        
                        f.once('error', function(err) {
                            console.log('Fetch error: ' + err)
                        })
                    } catch (err) {
                        console.log(err)
                    }
                }
            })
        })
    }, 30000)
})

myImap.once('error', function(err) { // this event will call if there is any issue will come during making imap connection
    console.log(err)
})

myImap.once('end', function() { // this event will call once the imap connection is closed
    console.log('Connection ended')
})

myImap.connect()