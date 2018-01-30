// Password Based Key Derivation with Web Cryptography API
//
// Copyright (c) 2015 Info Tech, Inc.
// Provided under the MIT license.
// See LICENSE file for details.

document.addEventListener("DOMContentLoaded", function() {
    "use strict";

    // Check that web crypto is even available
    if (!window.crypto || !window.crypto.subtle) {
        alert("Your browser does not support the Web Cryptography API! This page will not work.");
        return;
    }

    document.getElementById("salt-btn").addEventListener("click", generateSalt)
    document.getElementById("pwd-btn").addEventListener("click", deriveKey);
    document.getElementById("encrypt-btn").addEventListener("click", encrypt);
    document.getElementById("decrypt-btn").addEventListener("click", decrypt);

    // Rest of code goes here.

});

function generateSalt() {
    var c = new OpenCrypto();

    c.getRandomSalt().then(salt => {
        document.getElementById("salt").value = salt;
    }).catch(err => alert(err));
}

function deriveKey() {
    var c = new OpenCrypto();
    var pwd = document.getElementById("pwd").value;
    var salt = document.getElementById("salt").value;

    c.keyFromPassphrase(pwd, salt).then(key => {
        document.getElementById("key").textContent = key;
    }).catch(err => alert(err));
}

function encrypt() {
    var c = new OpenCrypto();
    var key = document.getElementById("key").textContent;
    var data = btoa(document.getElementById("data").value);

    c.importDerivedKey(key).then(key => {
        c.encrypt(key, data).then(enc => {
            document.getElementById("encrypted").value = enc;
        }).catch(err => alert(err));
    }).catch(err => alert(err));
}

function decrypt() {
    var c = new OpenCrypto();
    var key = document.getElementById("key").textContent;
    var data = document.getElementById("encrypted").value;

    c.importDerivedKey(key).then(key => {
        c.decrypt(key, data).then(dec => {
            document.getElementById("decrypted").value = atob(dec);
        }).catch(err => alert(err));
    }).catch(err => alert(err));
}
