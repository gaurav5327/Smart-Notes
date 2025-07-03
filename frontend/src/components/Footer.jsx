import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: "Features", href: "/features" },
      { name: "Pricing", href: "/pricing" },
      { name: "API", href: "/api" },
      { name: "Documentation", href: "/docs" },
    ],
    company: [
      { name: "About", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" },
    ],
    support: [
      { name: "Help Center", href: "/help" },
      { name: "Community", href: "/community" },
      { name: "Status", href: "/status" },
      { name: "Feedback", href: "/feedback" },
    ],
    legal: [
      { name: "Privacy", href: "/privacy" },
      { name: "Terms", href: "/terms" },
      { name: "Security", href: "/security" },
      { name: "Cookies", href: "/cookies" },
    ],
  };

  return (
    <footer className="bg-dark border-top border-secondary">
      <Container className="py-5">
        {/* Main Footer Content */}
        <Row className="g-4 mb-4">
          {/* Brand Section */}
          <Col lg={3} md={6}>
            <div className="d-flex align-items-center mb-3">
              <span className="fs-2 me-2">🧠</span>
              <span className="h4 fw-bold text-light mb-0">Smart Notes</span>
            </div>
            <p className="text-light-emphasis mb-4">
              Transform your study materials into powerful learning tools with
              AI-powered summarization, flashcards, and intelligent quizzes.
            </p>
            <div className="d-flex gap-2">
              <Button
                variant="outline-light"
                size="sm"
                className="rounded-circle p-2"
              >
                <span className="fs-6">📧</span>
              </Button>
              <Button
                variant="outline-light"
                size="sm"
                className="rounded-circle p-2"
              >
                <span className="fs-6">🐦</span>
              </Button>
              <Button
                variant="outline-light"
                size="sm"
                className="rounded-circle p-2"
              >
                <span className="fs-6">💼</span>
              </Button>
            </div>
          </Col>

          {/* Links Sections */}
          <Col lg={2} md={6}>
            <h5 className="fw-semibold mb-3 text-light">Product</h5>
            <ul className="list-unstyled">
              {footerLinks.product.map((link) => (
                <li key={link.name} className="mb-2">
                  <Link
                    to={link.href}
                    className="text-light-emphasis text-decoration-none footer-link"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>

          <Col lg={2} md={6}>
            <h5 className="fw-semibold mb-3 text-light">Company</h5>
            <ul className="list-unstyled">
              {footerLinks.company.map((link) => (
                <li key={link.name} className="mb-2">
                  <Link
                    to={link.href}
                    className="text-light-emphasis text-decoration-none footer-link"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>

          <Col lg={2} md={6}>
            <h5 className="fw-semibold mb-3 text-light">Support</h5>
            <ul className="list-unstyled">
              {footerLinks.support.map((link) => (
                <li key={link.name} className="mb-2">
                  <Link
                    to={link.href}
                    className="text-light-emphasis text-decoration-none footer-link"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>

          <Col lg={2} md={6}>
            <h5 className="fw-semibold mb-3 text-light">Legal</h5>
            <ul className="list-unstyled">
              {footerLinks.legal.map((link) => (
                <li key={link.name} className="mb-2">
                  <Link
                    to={link.href}
                    className="text-light-emphasis text-decoration-none footer-link"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>
        </Row>

        <hr className="border-secondary" />

        {/* Bottom Footer */}
        <Row className="align-items-center">
          <Col md={6}>
            <p className="text-light-emphasis mb-0">
              © {currentYear} Smart Notes Summarizer. All rights reserved.
            </p>
          </Col>

          <Col md={6} className="text-md-end">
            <p className="text-light-emphasis mb-0">
              <span>Made with ❤️ for students worldwide</span>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
