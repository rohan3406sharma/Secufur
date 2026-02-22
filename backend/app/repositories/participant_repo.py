from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.participant import Participant
from app.repositories.base_repo import BaseRepository


class ParticipantRepository(BaseRepository[Participant]):
    def __init__(self):
        super().__init__(Participant)

    async def get_by_event(
        self,
        db: AsyncSession,
        event_id: int
    ) -> list[Participant]:
        result = await db.execute(
            select(Participant).where(Participant.event_id == event_id)
        )
        return result.scalars().all()
