import React from "react";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  const features = [
    {
      icon: "📄",
      title: "PDF Upload",
      description:
        "Upload your study materials in PDF format with drag & drop support",
    },
    {
      icon: "🧠",
      title: "AI Summarization",
      description:
        "Get intelligent summaries that capture key concepts and ideas",
    },
    {
      icon: "📚",
      title: "Smart Flashcards",
      description:
        "Auto-generated flashcards for effective spaced repetition learning",
    },
    {
      icon: "⚡",
      title: "Interactive Quizzes",
      description:
        "Test your knowledge with AI-powered questions and instant feedback",
    },
  ];

  const stats = [
    { number: "10K+", label: "Students" },
    { number: "50K+", label: "Documents Processed" },
    { number: "95%", label: "Success Rate" },
    { number: "4.9", label: "User Rating" },
  ];

  const steps = [
    {
      step: "01",
      title: "Upload",
      description: "Upload your PDF study materials",
    },
    {
      step: "02",
      title: "Process",
      description: "AI analyzes and summarizes content",
    },
    {
      step: "03",
      title: "Learn",
      description: "Study with flashcards and quizzes",
    },
  ];

  return (
    <div className="min-h-screen bg-dark text-light">
      {/* Hero Section */}
      <div className="hero-section position-relative overflow-hidden">
        <div className="hero-bg"></div>
        <Container className="py-5 position-relative">
          <Row className="justify-content-center text-center py-5">
            <Col lg={10}>
              {/* Badge */}
              <div className="mb-4">
                <span className="badge bg-primary bg-opacity-25 text-primary px-3 py-2 fs-6 rounded-pill">
                  ✨ AI-Powered Learning Platform
                </span>
              </div>

              {/* Main heading */}
              <h1 className="display-3 fw-bold mb-4 hero-title">
                Welcome to{" "}
                <span className="text-gradient">Smart Notes Summarizer</span> 🧠
              </h1>

              {/* Description */}
              <p
                className="lead fs-4 text-light-emphasis mb-5 mx-auto"
                style={{ maxWidth: "800px" }}
              >
                Upload your study materials in PDF format, and we'll summarize
                them, generate flashcards, and even quiz you with intelligent
                questions!
              </p>

              {/* CTA Buttons */}
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center mb-5">
                <Button
                  as={Link}
                  to="/login"
                  size="lg"
                  className="btn-gradient px-4 py-3 fw-semibold shadow-lg"
                >
                  Get Started →
                </Button>

                <Button
                  as={Link}
                  to="/register"
                  variant="outline-light"
                  size="lg"
                  className="px-4 py-3 fw-semibold btn-outline-custom"
                >
                  Create Account
                </Button>
              </div>

              {/* Stats */}
              <Row className="justify-content-center">
                {stats.map((stat, index) => (
                  <Col xs={6} md={3} key={index} className="mb-3">
                    <div className="text-center">
                      <div className="display-6 fw-bold text-primary mb-1">
                        {stat.number}
                      </div>
                      <div className="text-light-emphasis">{stat.label}</div>
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Features Section */}
      <div className="py-5 bg-dark-subtle">
        <Container className="py-5">
          <Row className="text-center mb-5">
            <Col>
              <h2 className="display-4 fw-bold mb-4">
                Powerful Features for{" "}
                <span className="text-primary">Smarter Learning</span>
              </h2>
              <p
                className="lead text-light-emphasis mx-auto"
                style={{ maxWidth: "600px" }}
              >
                Everything you need to transform your study materials into an
                interactive learning experience
              </p>
            </Col>
          </Row>

          <Row className="g-4">
            {features.map((feature, index) => (
              <Col md={6} lg={3} key={index}>
                <Card className="h-100 bg-dark border-secondary feature-card">
                  <Card.Body className="text-center p-4">
                    <div className="feature-icon mb-3">
                      <span className="fs-1">{feature.icon}</span>
                    </div>
                    <Card.Title className="h5 fw-semibold text-light mb-3">
                      {feature.title}
                    </Card.Title>
                    <Card.Text className="text-light-emphasis">
                      {feature.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* How it Works Section */}
      <div className="py-5">
        <Container className="py-5">
          <Row className="text-center mb-5">
            <Col>
              <h2 className="display-4 fw-bold mb-4">
                How It <span className="text-primary">Works</span>
              </h2>
              <p
                className="lead text-light-emphasis mx-auto"
                style={{ maxWidth: "600px" }}
              >
                Get started in just three simple steps
              </p>
            </Col>
          </Row>

          <Row className="justify-content-center">
            {steps.map((item, index) => (
              <Col
                md={4}
                key={index}
                className="text-center mb-4 position-relative"
              >
                <div className="mb-4">
                  <div className="step-number mx-auto mb-3">{item.step}</div>
                </div>
                <h3 className="h4 fw-semibold mb-3 text-light">{item.title}</h3>
                <p className="text-light-emphasis">{item.description}</p>

                {/* Connector line */}
                {index < 2 && (
                  <div className="step-connector d-none d-md-block"></div>
                )}
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* CTA Section */}
      <div className="py-5 cta-section">
        <Container className="py-5 text-center">
          <Row className="justify-content-center">
            <Col lg={8}>
              <h2 className="display-4 fw-bold mb-4 text-light">
                Ready to Transform Your Learning?
              </h2>
              <p className="lead text-light-emphasis mb-5">
                Join thousands of students who are already using Smart Notes
                Summarizer to ace their studies
              </p>

              <Button
                as={Link}
                to="/register"
                size="lg"
                className="btn-gradient px-5 py-3 fw-semibold shadow-lg"
              >
                Start Free Trial ⭐
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Home;
