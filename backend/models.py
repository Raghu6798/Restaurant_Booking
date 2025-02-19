from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime 

class Booking(BaseModel):
    user_name: str
    date: str
    time: str
    guests: int
    special_requests: Optional[str] = None
    created_at: datetime = datetime.time()

    