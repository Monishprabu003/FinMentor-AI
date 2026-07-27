def test_health_check(client):
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_user_registration(client):
    signup_data = {
        "email": "testlearner@finmentor.ai",
        "password": "SecurePassword123!",
        "full_name": "Test Learner",
        "experience_level": "professional"
    }
    res_signup = client.post("/api/v1/auth/register", json=signup_data)
    assert res_signup.status_code == 201
    data_signup = res_signup.json()
    assert data_signup["email"] == "testlearner@finmentor.ai"
    assert data_signup["full_name"] == "Test Learner"
