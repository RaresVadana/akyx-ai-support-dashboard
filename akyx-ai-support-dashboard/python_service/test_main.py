from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_suggest():
    response = client.post("/suggest", json={"message": "Cannot login"})
    assert response.status_code == 200
    data = response.json()
    assert "Thank you for" in data["suggestion"]