from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.services.participant_service import ParticipantService
from app.schemas.participant import ParticipantCreate, ParticipantResponse

router = APIRouter()
service = ParticipantService()


@router.post("/", response_model=ParticipantResponse)
async def add_participant(
    request: ParticipantCreate,
    db: AsyncSession = Depends(get_db)
):
    return await service.add_participant(
        db,
        request.name,
        request.email,
        request.event_id
    )
