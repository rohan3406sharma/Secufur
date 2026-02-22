from sqlalchemy.ext.asyncio import AsyncSession
from app.repositories.participant_repo import ParticipantRepository
from app.models.participant import Participant


class ParticipantService:
    def __init__(self):
        self.participant_repo = ParticipantRepository()

    async def add_participant(
        self,
        db: AsyncSession,
        name: str,
        email: str,
        event_id: int
    ) -> Participant:
        participant = Participant(
            name=name,
            email=email,
            event_id=event_id
        )
        return await self.participant_repo.create(db, participant)
