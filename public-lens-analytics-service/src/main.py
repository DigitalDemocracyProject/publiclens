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