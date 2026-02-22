from pydantic import BaseModel, Field
from datetime import datetime


class EventCreate(BaseModel):
    name: str = Field(min_length=3, max_length=255)
    description: str | None = Field(default=None, max_length=1000)


class EventResponse(BaseModel):
    id: int
    name: str
    description: str | None
    organizer_id: int
    created_at: datetime

    class Config:
        from_attributes = True
