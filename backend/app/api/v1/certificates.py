from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.services.certificate_service import CertificateService
from app.schemas.certificate import CertificateIssueResponse

router = APIRouter()
service = CertificateService()


@router.post("/issue/{participant_id}", response_model=CertificateIssueResponse)
async def issue_certificate(
    participant_id: int,
    db: AsyncSession = Depends(get_db)
):
    return await service.issue_certificate(db, participant_id)
