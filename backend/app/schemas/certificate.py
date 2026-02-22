from pydantic import BaseModel
from datetime import datetime
from app.core.constants import CertificateStatus


class CertificateIssueResponse(BaseModel):
    verification_token: str
    issued_at: datetime
    status: CertificateStatus

    class Config:
        from_attributes = True
