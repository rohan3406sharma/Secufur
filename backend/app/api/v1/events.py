from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.db.session import get_db
from app.models.event import Event
from app.models.user import User
from app.schemas.event import EventCreate, EventResponse
from app.core.security import get_current_user

router = APIRouter()


# ✅ CREATE EVENT (Protected)
@router.post("/", response_model=EventResponse)
async def create_event(
    event: EventCreate,
    db: AsyncSession = Depends(get_db),
    current_user: str = Depends(get_current_user),
):
    # 🔥 Get user from DB using email from token
    result = await db.execute(
        select(User).where(User.email == current_user)
    )
    user = result.scalar_one_or_none()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # 🔥 Create event with correct organizer_id
    new_event = Event(
        name=event.name,
        description=event.description,
        organizer_id=user.id,
    )

    db.add(new_event)
    await db.commit()
    await db.refresh(new_event)

    return new_event


# ✅ GET ALL EVENTS (Protected)
@router.get("/", response_model=list[EventResponse])
async def get_events(
    db: AsyncSession = Depends(get_db),
    current_user: str = Depends(get_current_user),
):
    result = await db.execute(select(Event))
    events = result.scalars().all()
    return events
