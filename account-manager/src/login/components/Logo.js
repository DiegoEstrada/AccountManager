import React, { Component } from 'react'

var imageLogo = require('../../common/img/accountManagerLogo.png')

export default class Logo extends Component {
    render() {
        return (
            <div className="login-logo">
                
                 {/* <!--<p><b>Account </b>Manager</p>--> */}

                <a href="./"><img src={imageLogo}  alt="Logo" /></a>
                 
                
            </div>
        )
    }
}
