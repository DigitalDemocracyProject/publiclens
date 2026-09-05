import os
import sys

# Adds the project root directory to sys.path
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(CURRENT_DIR)

# Add both to sys.path so both 'api' and 'src.api' resolves correctly
if CURRENT_DIR not in sys.path:
    sys.path.insert(0, CURRENT_DIR)
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)
from fastapi import FastAPI
from api.routes import router as survey_analysis_router

app = FastAPI(
    title="Survey Analyzer Service",
    description="A microservice for analyzing survey data using Pandas.",
    version="1.0.0"
)

# Register routes
app.include_router(survey_analysis_router, prefix="/api/v1/survey-analyzer", tags=["Survey Analysis"])

@app.get("/health")
def health_check():
    return {"status": "ok"}
