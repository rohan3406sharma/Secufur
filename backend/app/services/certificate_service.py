from sqlalchemy.ext.asyncio import AsyncSession
from app.repositories.certificate_repo import CertificateRepository
from app.repositories.participant_repo import ParticipantRepository
from app.models.certificate import Certificate
from app.utils.token_generator import generate_token
from app.core.exceptions import BadRequest
from app.core.constants import CertificateStatus


class CertificateService:
    def __init__(self):
        self.cert_repo = CertificateRepository()
        self.participant_repo = ParticipantRepository()

    async def issue_certificate(
        self,
        db: AsyncSession,
        participant_id: int
    ) -> Certificate:
        existing = await self.cert_repo.get_by_participant(db, participant_id)
        if existing:
            raise BadRequest("Certificate already issued")

        token = generate_token()

        certificate = Certificate(
            verification_token=token,
            status=CertificateStatus.ACTIVE,
            participant_id=participant_id
        )

        return await self.cert_repo.create(db, certificate)

    async def revoke_certificate(
        self,
        db: AsyncSession,
        certificate: Certificate
    ) -> Certificate:
        return await self.cert_repo.revoke(db, certificate)
