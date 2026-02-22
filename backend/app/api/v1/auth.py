from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.services.auth_service import AuthService
from app.schemas.auth import RegisterRequest, LoginRequest, TokenResponse
from app.db.session import get_db

router = APIRouter(prefix="/auth", tags=["Authentication"])

service = AuthService()


@router.post("/register")
async def register(
    request: RegisterRequest,
    db: AsyncSession = Depends(get_db)
):
    return await service.register(
        db,
        request.email,
        request.password
    )


@router.post("/login", response_model=TokenResponse)
async def login(
    request: LoginRequest,
    db: AsyncSession = Depends(get_db)
):
    return await service.login(
        db,
        request.email,
        request.password
    )
