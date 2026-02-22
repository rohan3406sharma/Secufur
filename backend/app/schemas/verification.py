from pydantic import BaseModel


class VerificationResponse(BaseModel):
    valid: bool
    participant: str | None = None
    event: str | None = None
