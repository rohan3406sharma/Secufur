from fastapi import HTTPException, status


def ensure_owner(resource_owner_id: int, current_user_id: int):
    if resource_owner_id != current_user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to access this resource"
        )
