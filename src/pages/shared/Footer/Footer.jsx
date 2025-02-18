

const Footer = () => {
    return (
        <footer className="footer bg-base-300 text-base-content font-medium p-10">
            <aside>

                {/* <img src="https://i.ibb.co.com/4ZzjnNc/nav-logo.png" alt="logo" className="w-32" /> */}
                <h3 className="text-xl font-semibold">CureMedix Company Ltd.</h3>
                <p>
                    Providing reliable service since 2002
                </p>
            </aside>
            <nav>
                <h6 className="footer-title">Services</h6>
                <a className="link link-hover">Branding</a>
                <a className="link link-hover">Design</a>
                <a className="link link-hover">Marketing</a>
                <a className="link link-hover">Advertisement</a>
            </nav>
            <nav>
                <h6 className="footer-title">Company</h6>
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Jobs</a>
                <a className="link link-hover">Press kit</a>
            </nav>
            <nav>
                <h6 className="footer-title">Legal</h6>
                <a className="link link-hover">Terms of use</a>
                <a className="link link-hover">Privacy policy</a>
                <a className="link link-hover">Cookie policy</a>
            </nav>
        </footer>
    );
};

export default Footer;