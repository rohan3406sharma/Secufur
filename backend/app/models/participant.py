from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, ForeignKey
from app.models.base import Base


class Participant(Base):
    __tablename__ = "participants"

    id: Mapped[int] = mapped_column(primary_key=True)

    name: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    email: Mapped[str] = mapped_column(
        String(255),
        index=True,
        nullable=False
    )

    event_id: Mapped[int] = mapped_column(
        ForeignKey("events.id", ondelete="CASCADE"),
        nullable=False
    )

    # relationships
    event: Mapped["Event"] = relationship(
        back_populates="participants"
    )

    certificate: Mapped["Certificate"] = relationship(
        back_populates="participant",
        uselist=False
    )
