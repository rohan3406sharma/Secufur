from enum import Enum


class UserRole(str, Enum):
    ORGANIZER = "organizer"
    ADMIN = "admin"


class CertificateStatus(str, Enum):
    ACTIVE = "ACTIVE"
    REVOKED = "REVOKED"
    EXPIRED = "EXPIRED"
