from sqlalchemy.ext.asyncio import AsyncSession
from app.models.user import User
from app.schemas.auth import RegisterRequest, LoginRequest
from passlib.context import CryptContext
from sqlalchemy.future import select

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# ✅ Create User
async def create_user(db: AsyncSession, request: RegisterRequest):
    result = await db.execute(
        select(User).where(User.email == request.email)
    )
    existing_user = result.scalar_one_or_none()

    if existing_user:
        return None

    hashed_password = pwd_context.hash(request.password)

    new_user = User(
        email=request.email,
        password=hashed_password
    )

    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)

    return new_user


# ✅ Authenticate User
async def authenticate_user(db: AsyncSession, request: LoginRequest):
    result = await db.execute(
        select(User).where(User.email == request.email)
    )
    user = result.scalar_one_or_none()

    if not user:
        return None

    if not pwd_context.verify(request.password, user.password):
        return None

    return user
