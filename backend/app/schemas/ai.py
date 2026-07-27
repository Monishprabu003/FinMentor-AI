from pydantic import BaseModel
from typing import Optional, List, Dict, Any

class MessageCreate(BaseModel):
    prompt: str
    conversation_id: Optional[str] = None

class MessageResponse(BaseModel):
    id: str
    sender: str # 'user' or 'ai'
    text: str
    timestamp: str
    table_data: Optional[Dict[str, Any]] = None
    formula_code: Optional[str] = None
    follow_up_prompts: Optional[List[str]] = None

class ConversationResponse(BaseModel):
    id: str
    title: str
    category: str
    pinned: bool
    last_message: str
    timestamp: str
    messages: List[MessageResponse]
