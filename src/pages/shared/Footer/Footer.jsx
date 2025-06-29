

const Footer = () => {
    return (
        <div className="">
            <footer className="footer bg-base-300 text-base-content/95 font-medium pt-10 md:pt-12 lg:pt-20 pb-4 md:pb-6 lg:pb-8 px-12 md:px-14 lg:px-28">
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
            {/* new code below */}
            <div className="bg-base-300 text-base-content/95">
                <hr className="w-11/12 mx-auto border-t border-base-content/25" />
                <p className="w-full text-left text-sm pl-12 md:pl-14 lg:pl-28 pt-1.5 md:pt-2.5 lg:pt-4 pb-4 md:pb-6 lg:pb-8">
                    © {new Date().getFullYear()} All Rights Reserved by CureMedix Company Ltd.
                </p>
            </div>
            {/* new code above */}

        </div>
    );
};

export default Footer;