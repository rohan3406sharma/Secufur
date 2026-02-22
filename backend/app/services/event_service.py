from sqlalchemy.ext.asyncio import AsyncSession
from app.repositories.event_repo import EventRepository
from app.core.exceptions import NotFound
from app.models.event import Event


class EventService:
    def __init__(self):
        self.event_repo = EventRepository()

    async def create_event(
        self,
        db: AsyncSession,
        name: str,
        description: str | None,
        organizer_id: int
    ) -> Event:
        event = Event(
            name=name,
            description=description,
            organizer_id=organizer_id
        )
        return await self.event_repo.create(db, event)

    async def get_event(
        self,
        db: AsyncSession,
        event_id: int
    ) -> Event:
        event = await self.event_repo.get_by_id(db, event_id)
        if not event:
            raise NotFound("Event not found")
        return event
