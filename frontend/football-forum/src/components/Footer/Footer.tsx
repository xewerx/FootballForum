import React from 'react'
import githubIcon from '../../assets/github.png';
import linkedinIcon from '../../assets/linkedin.svg';

function Footer() {
    return (
        <div className="footer">
            <div>
                <p>App created by Ewaryst Ławecki&copy;</p>
            </div>
            <div className="footer-links">
                <p>Visit&nbsp;me&nbsp;here:</p>
                <a href="https://github.com/xewerx" target="_blank" rel="noreferrer">
                    <img src={githubIcon} alt="Github" />
                </a>
                <a href="https://www.linkedin.com/in/ewaryst-lawecki/" target="_blank" rel="noreferrer">
                    <img src={linkedinIcon} alt="LinkedIn" />
                </a>
            </div>
        </div>
    )
}

export default Footer;