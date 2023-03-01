'use strict'

import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const EMAIL_KEY = "emailDB"

_createEmails()

export const EmailService = {
    query,
    get,
    remove,
    save,
    createUser,
    // getEmpty,
}

function _createEmails() {
    let emails = utilService.loadFromStorage(EMAIL_KEY)
    if (!emails || !emails.length) {
        emails = [{
            id: 'e101',
            subject: 'Miss you!',
            body: 'Would love to catch up sometimes',
            isRead: false,
            sentAt: 1551133930594,
            removedAt: null,
            from: 'momo@momo.com',
            to: 'user@appsus.com'
        },
        {
            id: 'e102',
            subject: 'Still miss you!',
            body: 'heyyyy',
            isRead: true,
            sentAt: 1551133930694,
            removedAt: null,
            from: 'momo@momo.com',
            to: 'user@appsus.com'
        }]
        utilService.saveToStorage(EMAIL_KEY, emails)
    }
}

function createUser() {
    const loggedinUser = {
        email: 'user@appsus.com',
        fullname: 'Mahatma Appsus'
    }
    return loggedinUser
}

function query(filterBy = {}) {
    return storageService.query(EMAIL_KEY)
    // .then(emails => {
    //     if (filterBy.txt) {
    //         const regex = new RegExp(filterBy.txt, 'i')
    //         emails = emails.filter(email => regex.test(email.from))
    //     }
    //     if (filterBy.minPrice) {
    //         emails = emails.filter(email => email.listPrice.amount >= filterBy.minPrice)
    //     }
    //     return emails
    // })
}

function get(emailId) {
    return storageService.get(EMAIL_KEY, emailId)
    // .then(_setNextPrevEmailId)
}

function remove(emailId) {
    return storageService.remove(EMAIL_KEY, emailId)
}

function save(email) {
    if (email.id) {
        return storageService.put(EMAIL_KEY, email)
    } else {
        return storageService.post(EMAIL_KEY, email)
    }
}