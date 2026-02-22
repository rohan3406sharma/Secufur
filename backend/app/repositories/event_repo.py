from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.event import Event
from app.repositories.base_repo import BaseRepository


class EventRepository(BaseRepository[Event]):
    def __init__(self):
        super().__init__(Event)

    async def get_by_organizer(
        self,
        db: AsyncSession,
        organizer_id: int
    ) -> list[Event]:
        result = await db.execute(
            select(Event).where(Event.organizer_id == organizer_id)
        )
        return result.scalars().all()
