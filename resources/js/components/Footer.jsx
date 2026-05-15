export default function Footer() {
    return (
        <>
            {/* Footer */}
            <footer
                className="bg-dark text-white pt-5 pb-4"
                style={{ fontSize: "18px" }}
            >
                <div className="container text-md-left">
                    <div className="row text-md-left">
                        {/* Get to Know Us */}
                        <div className="col mt-3" style={{ color: "#808080" }}>
                            <h5 className="text-uppercase mb-4 font-weight-bold md-sz">
                                Get to know us
                            </h5>

                            <p>
                                ApniDukan is a modern online shopping platform
                                designed to provide customers with a simple,
                                fast, and secure shopping experience.
                            </p>
                        </div>

                        {/* Help */}
                        <div className="col mt-3" style={{ color: "#808080" }}>
                            <h5 className="text-uppercase mb-4 font-weight-bold md-sz">
                                Let us help you
                            </h5>
                            <p>
                                <a
                                    href="/"
                                    className="text-white"
                                    style={{ textDecoration: "none" }}
                                >
                                    Contact us
                                </a>
                            </p>
                        </div>

                        {/* Policy */}
                        <div className="col mt-3" style={{ color: "#808080" }}>
                            <h5 className="text-uppercase mb-4 font-weight-bold md-sz">
                                Policy
                            </h5>

                            <p>
                                <a
                                    href="#"
                                    className="text-white"
                                    style={{ textDecoration: "none" }}
                                >
                                    Return policy
                                </a>
                            </p>
                        </div>

                        {/* Social Media */}
                        <div className="col mt-3" style={{ color: "#808080" }}>
                            <div>
                                <h5 className="text-uppercase mb-4 font-weight-bold md-sz">
                                    Connect with us
                                </h5>

                                <p>
                                    <a
                                        href="https://www.facebook.com"
                                        className="text-white"
                                        style={{ textDecoration: "none" }}
                                    >
                                        <i className="fab fa-facebook-square me-2"></i>
                                        Facebook
                                    </a>
                                </p>

                                <p>
                                    <a
                                        href="https://twitter.com"
                                        className="text-white"
                                        style={{ textDecoration: "none" }}
                                    >
                                        <i className="fab fa-twitter-square me-2"></i>
                                        Twitter
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>

                    <hr className="mb-4" />

                    {/* Copyright */}
                    <div className="row align-items-center">
                        <div className="text-center">
                            Copyright &copy; and &reg; Since 2026 Under
                            ApniDukaan | Vineet kumar
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
