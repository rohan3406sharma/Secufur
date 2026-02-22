from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.db.session import get_db
from app.models.certificate import Certificate
from app.models.participant import Participant
from app.models.event import Event

router = APIRouter()


@router.get("/{token}")
async def verify_certificate(
    token: str,
    db: AsyncSession = Depends(get_db)
):
    # Get certificate by token
    result = await db.execute(
        select(Certificate).where(Certificate.verification_token == token)
    )
    certificate = result.scalars().first()

    if not certificate:
        raise HTTPException(status_code=404, detail="Certificate not found")

    # Get participant
    result = await db.execute(
        select(Participant).where(Participant.id == certificate.participant_id)
    )
    participant = result.scalars().first()

    # Get event
    result = await db.execute(
        select(Event).where(Event.id == participant.event_id)
    )
    event = result.scalars().first()

    return {
        "valid": True,
        "participant": participant.name,
        "event": event.name
    }
