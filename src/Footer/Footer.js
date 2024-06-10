import './Footer.css';


function Footer() {
    return (
        <footer>
            <div class="connect-with-us">Connect with Us</div>
            <div class="social-buttons">
                <a href="https://www.facebook.com" class="facebook" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                <a href="https://www.twitter.com" class="twitter" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                <a href="https://www.instagram.com" class="instagram" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                <a href="https://www.linkedin.com" class="linkedin" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
            </div>
            <div class="copyright">
                © 2024 Stay Organized. All rights reserved.
            </div>
        </footer>
    )
}


export default Footer;