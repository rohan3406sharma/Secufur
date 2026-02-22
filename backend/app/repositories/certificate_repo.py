from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.certificate import Certificate
from app.repositories.base_repo import BaseRepository
from app.core.constants import CertificateStatus
from datetime import datetime


class CertificateRepository(BaseRepository[Certificate]):
    def __init__(self):
        super().__init__(Certificate)

    async def get_by_verification_token(
        self,
        db: AsyncSession,
        token: str
    ) -> Certificate | None:
        result = await db.execute(
            select(Certificate).where(
                Certificate.verification_token == token
            )
        )
        return result.scalar_one_or_none()

    async def get_by_participant(
        self,
        db: AsyncSession,
        participant_id: int
    ) -> Certificate | None:
        result = await db.execute(
            select(Certificate).where(
                Certificate.participant_id == participant_id
            )
        )
        return result.scalar_one_or_none()

    async def revoke(
        self,
        db: AsyncSession,
        certificate: Certificate
    ) -> Certificate:
        certificate.status = CertificateStatus.REVOKED
        certificate.revoked_at = datetime.utcnow()
        await db.commit()
        await db.refresh(certificate)
        return certificate
