from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
import pytz

IST = pytz.timezone('Asia/Kolkata')

class Booking(BaseModel):
    date: str
    time: str
    guests: int
    special_requests: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(IST)) 

