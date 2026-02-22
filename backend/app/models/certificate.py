from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, ForeignKey, DateTime
from datetime import datetime
from app.models.base import Base
from app.core.constants import CertificateStatus


class Certificate(Base):
    __tablename__ = "certificates"

    id: Mapped[int] = mapped_column(primary_key=True)

    verification_token: Mapped[str] = mapped_column(
        String(64),
        unique=True,
        index=True,
        nullable=False
    )

    status: Mapped[CertificateStatus] = mapped_column(
        default=CertificateStatus.ACTIVE,
        nullable=False
    )

    issued_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )

    revoked_at: Mapped[datetime | None] = mapped_column(
        DateTime
    )

    participant_id: Mapped[int] = mapped_column(
        ForeignKey("participants.id", ondelete="CASCADE"),
        unique=True,
        nullable=False
    )

    # relationships
    participant: Mapped["Participant"] = relationship(
        back_populates="certificate"
    )
