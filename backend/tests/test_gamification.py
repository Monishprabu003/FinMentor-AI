from app.services.gamification_service import GamificationService

def test_gamification_xp_and_level_calculation():
    class DummyUser:
        def __init__(self):
            self.xp = 3450
            self.level = 7
            self.level_title = "Wealth Builder"

    class DummyDB:
        def commit(self): pass
        def refresh(self, user): pass

    user = DummyUser()
    db = DummyDB()

    result = GamificationService.award_xp(user, db, 150)
    assert result["total_xp"] == 3600
    assert result["level"] == 8
    assert result["level_title"] == "Financial Strategist"
