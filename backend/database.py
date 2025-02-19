from motor.motor_asyncio import AsyncIOMotorClient
from config import MONGO_URI, DB_NAME
from datetime import datetime
from bson import ObjectId

# 🚀 Connect to MongoDB
client = AsyncIOMotorClient(MONGO_URI)
database = client[DB_NAME]

# 📌 Define Collections
bookings_collection = database["bookings"]

# ✅ 1. Check Seat Availability
async def check_availability(date: str, time: str, max_seats: int = 20):
    existing_bookings = await bookings_collection.count_documents({"date": date, "time": time})
    available_seats = max_seats - existing_bookings
    return available_seats if available_seats > 0 else 0

# ✅ 2. Retrieve User's Booking History
async def get_user_bookings(user_name: str):
    bookings = await bookings_collection.find({"user_name": user_name}).to_list(length=10)
    return [
        {
            "id": str(booking["_id"]),
            "date": booking["date"],
            "time": booking["time"],
            "guests": booking["guests"],
            "special_requests": booking.get("special_requests", ""),
            "created_at": booking["created_at"].isoformat()
        }
        for booking in bookings
    ]

# ✅ 3. Insert a New Booking
async def create_booking(user_name: str, date: str, time: str, guests: int, special_requests: str = None):
    new_booking = {
        "user_name": user_name,
        "date": date,
        "time": time,
        "guests": guests,
        "special_requests": special_requests,
        "created_at": datetime.utcnow()
    }
    result = await bookings_collection.insert_one(new_booking)
    return {"id": str(result.inserted_id), **new_booking}

# ✅ 4. Delete a Booking
async def delete_booking(booking_id: str):
    result = await bookings_collection.delete_one({"_id": ObjectId(booking_id)})
    return result.deleted_count > 0
