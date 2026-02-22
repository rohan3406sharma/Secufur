from sqlalchemy.ext.asyncio import AsyncSession
from app.repositories.certificate_repo import CertificateRepository
from app.core.constants import CertificateStatus


class VerificationService:
    def __init__(self):
        self.cert_repo = CertificateRepository()

    async def verify(
        self,
        db: AsyncSession,
        token: str
    ) -> dict:
        certificate = await self.cert_repo.get_by_verification_token(db, token)

        if not certificate or certificate.status != CertificateStatus.ACTIVE:
            return {"valid": False}

        participant = certificate.participant
        event = participant.event

        return {
            "valid": True,
            "participant": participant.name,
            "event": event.name
        }
