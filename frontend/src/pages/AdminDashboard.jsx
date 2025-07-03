import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Spinner,
  Alert,
  Badge,
} from "react-bootstrap";
import toast from "react-hot-toast";

const API_URL = "https://smart-notes-backend-7jud.onrender.com";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const token = JSON.parse(localStorage.getItem("user")).token;
      const res = await axios.get(`${API_URL}/api/admin/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data);
      toast.success("Users loaded successfully");
    } catch (err) {
      console.error("Error fetching users:", err);
      const errorMessage =
        err.response?.data?.message || "Failed to fetch users";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this user? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const token = JSON.parse(localStorage.getItem("user")).token;
      await axios.delete(`${API_URL}/api/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter((user) => user._id !== id));
      toast.success("User deleted successfully");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to delete user";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-vh-100 bg-dark">
      <Container className="py-5">
        {/* Header Section */}
        <Row className="mb-5">
          <Col>
            <div className="text-center">
              <h1 className="display-4 fw-bold text-light mb-3">
                Admin Panel 👑
              </h1>
              <p className="lead text-light-emphasis">
                Manage users and monitor system activity
              </p>
            </div>
          </Col>
        </Row>

        {/* Quick Stats */}
        <Row className="g-4 mb-5">
          <Col md={3}>
            <Card className="bg-dark border-secondary text-center stats-card">
              <Card.Body>
                <div className="stats-icon mb-3">
                  <span className="fs-1">👥</span>
                </div>
                <h3 className="text-primary fw-bold">{users.length}</h3>
                <p className="text-light-emphasis mb-0">Total Users</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="bg-dark border-secondary text-center stats-card">
              <Card.Body>
                <div className="stats-icon mb-3">
                  <span className="fs-1">👨‍💼</span>
                </div>
                <h3 className="text-primary fw-bold">
                  {users.filter((u) => u.role === "admin").length}
                </h3>
                <p className="text-light-emphasis mb-0">Administrators</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="bg-dark border-secondary text-center stats-card">
              <Card.Body>
                <div className="stats-icon mb-3">
                  <span className="fs-1">👤</span>
                </div>
                <h3 className="text-primary fw-bold">
                  {users.filter((u) => u.role !== "admin").length}
                </h3>
                <p className="text-light-emphasis mb-0">Regular Users</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="bg-dark border-secondary text-center stats-card">
              <Card.Body>
                <div className="stats-icon mb-3">
                  <span className="fs-1">🔄</span>
                </div>
                <h3 className="text-primary fw-bold">
                  {loading ? <Spinner size="sm" /> : "Live"}
                </h3>
                <p className="text-light-emphasis mb-0">System Status</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Error Alert */}
        {error && (
          <Alert variant="danger" className="mb-4">
            <strong>Error:</strong> {error}
          </Alert>
        )}

        {/* Users Table */}
        <Row>
          <Col>
            <Card className="bg-dark border-secondary">
              <Card.Header className="bg-dark border-secondary d-flex justify-content-between align-items-center">
                <h4 className="fw-semibold text-light mb-0">
                  User Management
                  {users.length > 0 && (
                    <Badge bg="primary" className="ms-2">
                      {users.length}
                    </Badge>
                  )}
                </h4>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={fetchUsers}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner size="sm" animation="border" className="me-1" />
                      Loading...
                    </>
                  ) : (
                    <>🔄 Refresh</>
                  )}
                </Button>
              </Card.Header>

              <Card.Body className="p-0">
                {loading ? (
                  <div className="text-center py-5">
                    <Spinner animation="border" variant="primary" />
                    <p className="text-light-emphasis mt-3">Loading users...</p>
                  </div>
                ) : users.length === 0 ? (
                  <div className="text-center py-5">
                    <span className="fs-1">👤</span>
                    <h5 className="text-light mt-3">No users found</h5>
                    <p className="text-light-emphasis">
                      No users are currently registered in the system
                    </p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <Table
                      variant="dark"
                      striped
                      bordered
                      hover
                      className="mb-0"
                    >
                      <thead>
                        <tr>
                          <th className="text-center">#</th>
                          <th>👤 Name</th>
                          <th>📧 Email</th>
                          <th>🏷️ Role</th>
                          <th className="text-center">⚡ Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((u, index) => (
                          <tr key={u._id}>
                            <td className="text-center fw-semibold text-primary">
                              {index + 1}
                            </td>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="user-avatar me-3">
                                  <span className="fs-6">
                                    {u.role === "admin" ? "👑" : "👤"}
                                  </span>
                                </div>
                                <span className="fw-semibold text-light">
                                  {u.name}
                                </span>
                              </div>
                            </td>
                            <td className="text-light-emphasis">{u.email}</td>
                            <td>
                              <Badge
                                bg={u.role === "admin" ? "warning" : "success"}
                                className="text-dark fw-semibold"
                              >
                                {u.role === "admin" ? "👑 Admin" : "👤 User"}
                              </Badge>
                            </td>
                            <td className="text-center">
                              {u.role !== "admin" ? (
                                <Button
                                  variant="outline-danger"
                                  size="sm"
                                  onClick={() => deleteUser(u._id)}
                                  className="fw-semibold"
                                >
                                  🗑️ Delete
                                </Button>
                              ) : (
                                <Badge bg="secondary" className="text-light">
                                  🔒 Protected
                                </Badge>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Additional Info */}
        {users.length > 0 && (
          <Row className="mt-4">
            <Col>
              <Card className="bg-dark border-secondary">
                <Card.Body className="p-4">
                  <h5 className="text-light fw-semibold mb-3">
                    📊 Quick Summary
                  </h5>
                  <Row className="text-center">
                    <Col md={4}>
                      <div className="text-primary fw-bold fs-4">
                        {users.length}
                      </div>
                      <div className="text-light-emphasis">Total Users</div>
                    </Col>
                    <Col md={4}>
                      <div className="text-warning fw-bold fs-4">
                        {users.filter((u) => u.role === "admin").length}
                      </div>
                      <div className="text-light-emphasis">Administrators</div>
                    </Col>
                    <Col md={4}>
                      <div className="text-success fw-bold fs-4">
                        {users.filter((u) => u.role !== "admin").length}
                      </div>
                      <div className="text-light-emphasis">Regular Users</div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default AdminDashboard;
