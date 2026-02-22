from pydantic import BaseModel, EmailStr, Field


class ParticipantCreate(BaseModel):
    name: str = Field(min_length=2, max_length=255)
    email: EmailStr
    event_id: int


class ParticipantResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    event_id: int

    class Config:
        from_attributes = True
