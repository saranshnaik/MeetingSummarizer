from config.settings import settings
from db.models.user_model import User
from db.repositories.user_repository import UserRepository
from db.session import SessionLocal
from utils.password_handler import hash_password


def seed_admin():
    db = SessionLocal()

    try:
        existing_admin = UserRepository.get_user_by_email(
            db,
            settings.ADMIN_SEED_EMAIL
        )

        if existing_admin:
            print("Admin already exists")
            return

        admin_user = User(
            email=settings.ADMIN_SEED_EMAIL,
            hashed_password=hash_password(settings.ADMIN_SEED_PASSWORD),
            full_name="Admin",
            role="admin",
            is_active=True,
        )

        db.add(admin_user)
        db.commit()

        print("Admin user created.")

    finally:
        db.close()
