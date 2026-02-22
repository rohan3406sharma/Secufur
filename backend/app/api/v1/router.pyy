from fastapi import APIRouter
from app.api.v1 import auth, events, participants, certificates, verification

api_router = APIRouter(prefix="/api/v1")

api_router.include_router(auth.router, prefix="/auth", tags=["Auth"])
api_router.include_router(events.router, prefix="/events", tags=["Events"])
api_router.include_router(participants.router, prefix="/participants", tags=["Participants"])
api_router.include_router(certificates.router, prefix="/certificates", tags=["Certificates"])
api_router.include_router(verification.router, prefix="/verify", tags=["Verification"])

