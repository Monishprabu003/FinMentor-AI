from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_full_stack_backend():
    # 1. Health check
    res = client.get("/api/v1/health")
    assert res.status_code == 200
    assert res.json()["status"] == "healthy"
    print("✓ Health endpoint OK")

    # 2. Quick Demo Login
    auth_res = client.post("/api/v1/auth/demo-login")
    assert auth_res.status_code == 200
    token = auth_res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    print("✓ Demo Login & Seeding OK")

    # 3. Get Current User Profile
    me_res = client.get("/api/v1/auth/me", headers=headers)
    assert me_res.status_code == 200
    user_data = me_res.json()
    assert user_data["email"] == "demo@finmentor.ai"
    print(f"✓ Profile loaded: {user_data['full_name']}")

    # 4. Deterministic Executive Dashboard summary
    dash_res = client.get("/api/v1/analytics/dashboard", headers=headers)
    assert dash_res.status_code == 200
    dash_data = dash_res.json()
    assert "estimated_net_worth" in dash_data
    assert "budget_analyzer" in dash_data
    print(f"✓ Dashboard computed net worth: ${dash_data['estimated_net_worth']}, needs spent: ${dash_data['budget_analyzer']['needs_spent']}")

    # 5. AI Educational Chat Tutor
    chat_res = client.post("/api/v1/ai/chat", json={"message": "What is an ETF?"}, headers=headers)
    assert chat_res.status_code == 200
    chat_data = chat_res.json()
    assert len(chat_data["reply"]) > 20
    print("✓ AI Tutor explained ETF successfully")

    # 6. Learning Center & Books Library
    books_res = client.get("/api/v1/learn/books", headers=headers)
    assert books_res.status_code == 200
    assert len(books_res.json()) > 0
    print(f"✓ Book library loaded {len(books_res.json())} classic finance books")

if __name__ == "__main__":
    test_full_stack_backend()
    print("\nALL INTEGRATION VERIFICATIONS PASSED 100%!")
