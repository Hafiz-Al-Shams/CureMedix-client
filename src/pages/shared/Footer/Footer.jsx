

const Footer = () => {
    return (
        <footer className="footer bg-base-300 text-base-content/95 font-medium py-10 md:py-12 lg:py-20 px-12 md:px-14 lg:px-28">
            <aside>

                {/* <img src="https://i.ibb.co.com/4ZzjnNc/nav-logo.png" alt="logo" className="w-32" /> */}
                <h3 className="text-xl lg:text-2xl font-semibold">CureMedix Company Ltd.</h3>
                <p className="lg:text-lg">
                    Providing reliable service since 2002
                </p>
            </aside>
            <nav>
                <h6 className="footer-title text-base-content/85">Services</h6>
                <a className="link link-hover">Branding</a>
                <a className="link link-hover">Design</a>
                <a className="link link-hover">Marketing</a>
                <a className="link link-hover">Advertisement</a>
            </nav>
            <nav>
                <h6 className="footer-title text-base-content/85">Company</h6>
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Jobs</a>
                <a className="link link-hover">Press kit</a>
            </nav>
            <nav>
                <h6 className="footer-title text-base-content/85">Legal</h6>
                <a className="link link-hover">Terms of use</a>
                <a className="link link-hover">Privacy policy</a>
                <a className="link link-hover">Cookie policy</a>
            </nav>
        </footer>
    );
};

export default Footer;