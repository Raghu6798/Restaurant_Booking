from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_cerebras import ChatCerebras
from langchain_groq import ChatGroq
from langchain_nvidia_ai_endpoints import ChatNVIDIA
from langgraph.graph import StateGraph, END
from database import bookings_collection
from config import GROQ_API_KEY, CEREBRAS_API_KEY, GOOGLE_API_KEY, AI21_API_KEY



# Define agent state
class BookingState:
    user_query: str = ""
    available_seats: int = 0
    suggested_slots: list = []

# Check seat availability in MongoDB
async def check_seat_availability(state: BookingState):
    user_query = state.user_query

    # Extract date & time from user query (Example: "Do you have a table at 7 PM?")
    date_str = "2024-03-10"  # Example date
    time_str = "19:00"  # Example time

    existing_bookings = await bookings_collection.count_documents({"date": date_str, "time": time_str})
    available_seats = max(20 - existing_bookings, 0)

    if available_seats > 0:
        response = f"Yes, {available_seats} seats are available at {time_str}."
    else:
        response = "Sorry, we're fully booked at that time."

    return {"available_seats": available_seats, "response": response}

# Suggest alternative slots
async def suggest_alternative_slots(state: BookingState):
    if state.available_seats > 0:
        return {"response": state.response}

    alternative_times = ["18:00", "20:00", "21:00"]
    return {"response": f"We're fully booked at 19:00. Available slots: {', '.join(alternative_times)}.", "suggested_slots": alternative_times}

# Define LangGraph Workflow
workflow = StateGraph(BookingState)
workflow.add_node("check_availability", check_seat_availability)
workflow.add_node("suggest_slots", suggest_alternative_slots)

workflow.set_entry_point("check_availability")
workflow.add_edge("check_availability", "suggest_slots")
workflow.add_edge("suggest_slots", END)

seat_availability_agent = workflow.compile()
