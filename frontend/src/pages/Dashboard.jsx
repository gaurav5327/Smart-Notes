import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Spinner,
  Alert,
  Badge,
  Modal,
} from "react-bootstrap";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingNotes, setFetchingNotes] = useState(true);
  const [error, setError] = useState("");
  const [expandedCards, setExpandedCards] = useState({});

  // New states for animated popup
  const [showSummaryPopup, setShowSummaryPopup] = useState(false);
  const [newSummary, setNewSummary] = useState(null);
  const [animatingToBottom, setAnimatingToBottom] = useState(false);

  const fetchNotes = async () => {
    try {
      setFetchingNotes(true);
      const token =
        localStorage.getItem("user") &&
        JSON.parse(localStorage.getItem("user")).token;

      if (!token) {
        setError("Authentication token not found");
        return;
      }

      const res = await axios.get("/api/notes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes(res.data);
      setError("");
    } catch (err) {
      console.error("Error fetching notes:", err);
      setError("Failed to fetch notes. Please try again.");
      toast.error("Failed to fetch notes");
    } finally {
      setFetchingNotes(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setError(""); // Clear any previous errors

    if (selectedFile) {
      // Validate file type
      if (selectedFile.type !== "application/pdf") {
        setError("Please select a valid PDF file");
        setFile(null);
        e.target.value = "";
        return;
      }

      // Validate file size (10MB limit)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError("File size must be less than 10MB");
        setFile(null);
        e.target.value = "";
        return;
      }

      toast.success(`File "${selectedFile.name}" selected successfully`);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a PDF file");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      setLoading(true);
      setError("");

      const token = JSON.parse(localStorage.getItem("user")).token;
      const response = await axios.post("/api/notes/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      // Store the new summary for popup display
      setNewSummary(response.data);

      // Show animated popup
      setShowSummaryPopup(true);

      // Auto-close popup after 5 seconds and animate to bottom
      setTimeout(() => {
        setAnimatingToBottom(true);
        setTimeout(() => {
          setShowSummaryPopup(false);
          setAnimatingToBottom(false);
          setNewSummary(null);
          // Refresh notes to show the new one at bottom
          fetchNotes();
        }, 800); // Animation duration
      }, 5000);

      setFile(null);
      document.getElementById("fileInput").value = "";
      toast.success("File uploaded and processed successfully!");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Upload failed";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadClick = (e) => {
    console.log("Button clicked directly");
    handleUpload(e);
  };

  const toggleFlashcards = (noteId) => {
    setExpandedCards((prev) => ({
      ...prev,
      [noteId]: !prev[noteId],
    }));
  };

  const handleDeleteNote = async (noteId) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      const token = JSON.parse(localStorage.getItem("user")).token;
      await axios.delete(`/api/notes/${noteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Note deleted successfully");
      fetchNotes();
    } catch (err) {
      toast.error("Failed to delete note");
    }
  };

  const closeSummaryPopup = () => {
    setAnimatingToBottom(true);
    setTimeout(() => {
      setShowSummaryPopup(false);
      setAnimatingToBottom(false);
      setNewSummary(null);
      fetchNotes();
    }, 800);
  };

  return (
    <div className="min-vh-100 bg-dark">
      <Container className="py-5">
        {/* Header Section */}
        <Row className="mb-5">
          <Col>
            <div className="text-center">
              <h1 className="display-4 fw-bold text-light mb-3">
                Welcome back, {user?.name}! 👋
              </h1>
              <p className="lead text-light-emphasis">
                Upload your study materials and let AI transform them into
                powerful learning tools
              </p>
            </div>
          </Col>
        </Row>

        {/* Upload Section */}
        <Row className="mb-5">
          <Col lg={8} className="mx-auto">
            <Card className="bg-dark border-secondary shadow-lg">
              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  <div className="feature-icon mb-3">
                    <span className="fs-1">📄</span>
                  </div>
                  <h3 className="fw-semibold text-light mb-2">
                    Upload PDF Document
                  </h3>
                  <p className="text-light-emphasis">
                    Upload your study materials to generate summaries and
                    flashcards
                  </p>
                </div>

                {error && (
                  <Alert variant="danger" className="mb-4">
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleUpload}>
                  <Form.Group className="mb-4">
                    <Form.Control
                      id="fileInput"
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="bg-dark border-secondary text-light file-input"
                      size="lg"
                    />
                    <Form.Text className="text-light-emphasis">
                      Only PDF files are supported. Maximum file size: 10MB
                      {file && (
                        <div className="mt-2 text-success">
                          ✓ Selected: {file.name} (
                          {(file.size / 1024 / 1024).toFixed(2)} MB)
                        </div>
                      )}
                    </Form.Text>
                  </Form.Group>

                  <div className="text-center">
                    <Button
                      type="submit"
                      onClick={handleUploadClick}
                      className="btn-gradient px-4 py-2 fw-semibold"
                      disabled={loading || !file}
                      size="lg"
                    >
                      {loading ? (
                        <>
                          <Spinner
                            size="sm"
                            animation="border"
                            className="me-2"
                          />
                          Processing...
                        </>
                      ) : (
                        <>📚 Upload & Summarize</>
                      )}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Notes Section */}
        <Row>
          <Col>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="fw-bold text-light mb-0">
                Your Study Notes
                {notes.length > 0 && (
                  <Badge bg="primary" className="ms-2">
                    {notes.length}
                  </Badge>
                )}
              </h2>
              {notes.length > 0 && (
                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={fetchNotes}
                  disabled={fetchingNotes}
                >
                  {fetchingNotes ? (
                    <Spinner size="sm" animation="border" />
                  ) : (
                    "🔄 Refresh"
                  )}
                </Button>
              )}
            </div>

            {fetchingNotes ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p className="text-light-emphasis mt-3">
                  Loading your notes...
                </p>
              </div>
            ) : notes.length === 0 ? (
              <Card className="bg-dark border-secondary">
                <Card.Body className="text-center py-5">
                  <div className="mb-3">
                    <span className="fs-1">📝</span>
                  </div>
                  <h4 className="text-light mb-3">No notes yet</h4>
                  <p className="text-light-emphasis mb-0">
                    Upload your first PDF document to get started with
                    AI-powered learning!
                  </p>
                </Card.Body>
              </Card>
            ) : (
              <div className="notes-grid">
                {notes.map((note, index) => (
                  <Card
                    key={note._id || index}
                    className="bg-dark border-secondary mb-4 note-card"
                  >
                    <Card.Body className="p-4">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                          <Card.Title className="text-light fw-semibold mb-2">
                            📄 Document Summary
                          </Card.Title>
                          <small className="text-light-emphasis">
                            {note.createdAt
                              ? new Date(note.createdAt).toLocaleDateString()
                              : "Recently uploaded"}
                          </small>
                        </div>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDeleteNote(note._id)}
                          className="ms-2"
                        >
                          🗑️
                        </Button>
                      </div>

                      <Card.Text className="text-light-emphasis mb-4 summary-text">
                        {note.summary}
                      </Card.Text>

                      {note.flashcards && note.flashcards.length > 0 && (
                        <div>
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <Card.Subtitle className="text-light fw-semibold mb-0">
                              🧠 Flashcards ({note.flashcards.length})
                            </Card.Subtitle>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() => toggleFlashcards(note._id)}
                            >
                              {expandedCards[note._id] ? "Hide" : "Show"} Cards
                            </Button>
                          </div>

                          {expandedCards[note._id] && (
                            <div className="flashcards-container">
                              {note.flashcards.map((card, idx) => (
                                <Card
                                  key={idx}
                                  className="bg-dark-subtle border-secondary mb-3 flashcard"
                                >
                                  <Card.Body className="p-3">
                                    <div className="mb-2">
                                      <strong className="text-primary">
                                        Q:
                                      </strong>
                                      <span className="text-light ms-2">
                                        {card.question}
                                      </span>
                                    </div>
                                    <div>
                                      <strong className="text-success">
                                        A:
                                      </strong>
                                      <span className="text-light-emphasis ms-2">
                                        {card.answer}
                                      </span>
                                    </div>
                                  </Card.Body>
                                </Card>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                ))}
              </div>
            )}
          </Col>
        </Row>
      </Container>

      {/* Animated Summary Popup Modal */}
      <Modal
        show={showSummaryPopup}
        onHide={closeSummaryPopup}
        centered
        size="lg"
        className={`summary-popup-modal ${
          animatingToBottom ? "animate-to-bottom" : ""
        }`}
        backdrop="static"
      >
        <Modal.Header className="bg-dark border-secondary text-light">
          <Modal.Title className="d-flex align-items-center">
            <span className="me-2">✨</span>
            Summary Generated Successfully!
            <span className="ms-2">🎉</span>
          </Modal.Title>
          <Button
            variant="outline-light"
            size="sm"
            onClick={closeSummaryPopup}
            className="ms-auto"
          >
            ✕
          </Button>
        </Modal.Header>
        <Modal.Body className="bg-dark text-light p-4">
          {newSummary && (
            <div className="summary-content">
              <div className="text-center mb-4">
                <div className="success-icon mb-3">
                  <span className="fs-1 text-success">📄</span>
                </div>
                <h4 className="text-light fw-semibold">
                  Your document has been processed!
                </h4>
                <p className="text-light-emphasis">
                  Here's what we found in your study material:
                </p>
              </div>

              <Card className="bg-dark-subtle border-secondary mb-4">
                <Card.Header className="bg-dark border-secondary">
                  <h5 className="text-light mb-0">📋 Summary</h5>
                </Card.Header>
                <Card.Body>
                  <p className="text-light-emphasis mb-0">
                    {newSummary.summary}
                  </p>
                </Card.Body>
              </Card>

              {newSummary.flashcards && newSummary.flashcards.length > 0 && (
                <Card className="bg-dark-subtle border-secondary">
                  <Card.Header className="bg-dark border-secondary">
                    <h5 className="text-light mb-0">
                      🧠 Generated Flashcards ({newSummary.flashcards.length})
                    </h5>
                  </Card.Header>
                  <Card.Body>
                    <div
                      className="flashcards-preview"
                      style={{ maxHeight: "200px", overflowY: "auto" }}
                    >
                      {newSummary.flashcards.slice(0, 3).map((card, idx) => (
                        <div
                          key={idx}
                          className="mb-3 p-3 bg-dark rounded border border-secondary"
                        >
                          <div className="mb-2">
                            <strong className="text-primary">Q:</strong>
                            <span className="text-light ms-2">
                              {card.question}
                            </span>
                          </div>
                          <div>
                            <strong className="text-success">A:</strong>
                            <span className="text-light-emphasis ms-2">
                              {card.answer}
                            </span>
                          </div>
                        </div>
                      ))}
                      {newSummary.flashcards.length > 3 && (
                        <p className="text-center text-light-emphasis mb-0">
                          ... and {newSummary.flashcards.length - 3} more
                          flashcards!
                        </p>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              )}

              <div className="text-center mt-4">
                <p className="text-light-emphasis small">
                  This popup will automatically close in a few seconds and your
                  summary will appear below.
                </p>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="bg-dark border-secondary">
          <Button
            variant="outline-primary"
            onClick={closeSummaryPopup}
            className="fw-semibold"
          >
            Continue to Dashboard
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dashboard;
